const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SocketIO = require("socket.io");
const { Server } = require("http");

const config = require('../config');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const whitelist = [
  "http://localhost:3000",
  "https://demo.mypass.id"
];
const corsOptions = {
  // methods: ["GET, POST, OPTIONS"],
  // allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Allowed by CORS", origin);
      callback(null, true);
    } else {
      console.error("Not allowed by CORS", origin);
      callback(new Error("Not allowed by CORS " + origin), false);
    }
  },
};

const app = express();
// app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json());

const websocketPort = config.websocketPort;

console.log("Websocket server starting", websocketPort);

const server = new Server(app);
const socketServer = SocketIO(server);
server.listen(websocketPort);
const mobileClients = new Map();
const desktopClients = new Map();

setInterval(() => {
  try {
    if (mobileClients && mobileClients.size > 20) {
      const keys = Array.from(mobileClients.keys()).slice(0, 2);
      keys.forEach((k) => {
        mobileClients.delete(k);
        console.log("Removed mobile client", k);
      });
    }

    if (desktopClients && desktopClients.size > 20) {
      const keys = Array.from(desktopClients.keys()).slice(0, 2);
      keys.forEach((k) => {
        desktopClients.delete(k);
        console.log("Removed desktop client", k);
      });
    }
  } catch (error) {
    console.error("cleanUpStaleSessions", error);
  }
}, 10 * 60 * 1000); // every 10 minutes

try {
  const getChannelIdBySocket = (clients, socketId) =>
    [...clients.values()].find((entry) => entry.socketId === socketId);

  socketServer.on("connection", (socket) => {
    socket.on("registerMobileClient", async (data) => {
      const { channelId, version } = data;
      console.info(
        `Mobile client connected [id=${socket.id}, channel=${channelId}]`
      );

      if (!version || version !== config.minVersions.mobile) {
        console.log("version mismatched");
        socket.emit("minAppVersion", config.minVersions.mobile);
        const desktopClient = desktopClients.get(channelId);
        if (desktopClient && desktopClient.socket) {
          console.log("desktop notify");
          desktopClient.socket.emit("minAppVersion", config.minVersions.mobile);
        }
        socket.disconnect(true);
        return;
      }

      mobileClients.set(channelId, { socket, channelId, socketId: socket.id });
    });

    socket.on("registerDesktopClient", async (data) => {
      const { channelId } = data;
      console.info(
        `Desktop client connected [id=${socket.id}, channel=${channelId}]`
      );
      desktopClients.set(channelId, { socket, channelId, socketId: socket.id });

      const isMobileClient = mobileClients.has(channelId);
      if (isMobileClient) {
        const mobileClient = mobileClients.get(channelId);
        if (mobileClient && mobileClient.socket) {
          const mobileSocket = mobileClient.socket;
          mobileSocket && mobileSocket.emit("desktopConnected", { channelId });
          console.info(
            "Connection notification sent to mobile client",
            channelId
          );
        }
      }
    });

    socket.on("disconnect", async () => {
      console.info(`Client gone [id=${socket.id}]`);

      const desktopClient = getChannelIdBySocket(desktopClients, socket.id);
      if (desktopClient && desktopClient.channelId) {
        console.log("desktop client removed", desktopClient.channelId);
        await desktopClients.delete(desktopClient.channelId);
      }

      const mobileClient = getChannelIdBySocket(mobileClients, socket.id);
      if (mobileClient && mobileClient.channelId) {
        console.log("mobile client removed", mobileClient.channelId);
        await mobileClients.delete(mobileClient.channelId);
      }

      // console.log('connected desktopClients', Array.from(desktopClients).map(items => items?.[0]));
      // console.log('connected mobileClients', Array.from(mobileClients).map(items => items?.[0]));
    });

    socket.on("verifiablePresentation", async (data) => {
      const { channelId, payload } = data;
      const desktopClient = desktopClients.get(channelId);
      if (desktopClient && desktopClient.socket) {
        console.log(
          "Emit verifiablePresentation to desktop",
          channelId,
          payload
        );
        const desktopSocket = desktopClient.socket;
        desktopSocket && desktopSocket.emit("verifiablePresentation", payload);
        console.info("Verifiable Presentation sent to desktop client");
      }
    });

    socket.on("createCredential", async (data) => {
      const { channelId, payload } = data;
      const mobileClient = mobileClients.get(channelId);
      if (mobileClient && mobileClient.socket) {
        console.log("Emit createCredential to mobile", channelId, payload);
        const mobileSocket = mobileClient.socket;
        mobileSocket && mobileSocket.emit("createCredential", payload);
        console.info(
          "Create Credential request sent to mobile client",
          channelId
        );
      }
    });

    socket.on("createCredentialConfirmation", async (data) => {
      const { channelId, payload } = data;
      const desktopClient = desktopClients.get(channelId);
      if (desktopClient && desktopClient.socket) {
        console.log(
          "Emit createCredentialConfirmation to desktop",
          channelId,
          payload
        );
        const desktopSocket = desktopClient.socket;
        desktopSocket &&
          desktopSocket.emit("createCredentialConfirmation", payload);
        console.info(
          "Create Credential Confirmation sent to desktop client",
          channelId
        );
      }
    });

    socket.on("errorMessage", async (data) => {
      const { channelId, payload } = data;
      const desktopClient = desktopClients.get(channelId);
      if (desktopClient && desktopClient.socket) {
        console.log("Emit errorMessage to desktop", channelId, payload);
        const desktopSocket = desktopClient.socket;
        desktopSocket && desktopSocket.emit("errorMessage", payload);
      }
    });

    socket.on("rejectCredentials", async (data) => {
      const { channelId, payload } = data;
      const desktopClient = desktopClients.get(channelId);
      if (desktopClient && desktopClient.socket) {
        console.log("Emit rejectCredentials to desktop", channelId, payload);
        const desktopSocket = desktopClient.socket;
        desktopSocket && desktopSocket.emit("rejectCredentials", payload);
      }
    });
  });
} catch (error) {
  console.error(error);
}

/*
Check the status of server.
*/
app.get('/api/status', (req, res) => res.send({ status: "I'm alive!" }));

/*
Check if mobile client is connected
*/
app.get("/api/connection", cors(corsOptions), async (req, res) => {
  try {
    const mobileClient = mobileClients.has(req.query.channelId);
    console.log("isMobileConnected", req.query.channelId, mobileClient);
    if (mobileClient) {
      res.json({
        status: "success",
      });
    } else {
      res.json({
        status: "not connected",
      });
    }
  } catch (e) {
    console.error(e);
    res.json({
      status: "failure",
      error: JSON.stringify(e),
      mobileClient: null,
    });
  }
});

/*
Check if desktop client is connected
*/
app.get("/api/connection-app", cors(corsOptions), async (req, res) => {
  try {
    const desktopClient = desktopClients.has(req.query.channelId);
    console.log("isDesktopConnected", req.query.channelId, desktopClient);
    if (desktopClient) {
      res.json({
        status: "success",
      });
    } else {
      res.json({
        status: "not connected",
      });
    }
  } catch (e) {
    console.error(e);
    res.json({
      status: "failure",
      error: JSON.stringify(e),
      mobileClient: null,
    });
  }
});

module.exports = app;
