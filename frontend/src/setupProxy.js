const { createProxyMiddleware } = require('http-proxy-middleware');

/* eslint-disable no-underscore-dangle */
const __DEV__ = process.env.NODE_ENV !== 'production';

// local dev
// const API_URL = __DEV__ ? 'http://localhost:4000' : 'https://demo.mypass.id';
// const WS_URL = __DEV__ ? 'http://localhost:8000' : 'https://demo.mypass.id';

// dev
const API_URL = __DEV__ ? 'https://demo.mypass.id' : 'https://demo.mypass.id';
const WS_URL = __DEV__ ? 'https://demo.mypass.id' : 'https://demo.mypass.id';

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({ target: API_URL, changeOrigin: true }));
    app.use('/socket.io', createProxyMiddleware({ target: WS_URL, changeOrigin: true, ws: true }));
}
