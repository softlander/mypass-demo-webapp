module.exports = {
  provider: 'https://nodes.devnet.iota.org:443',
  serverPort: 4000,
  websocketPort: 8000,
  database: '../db/myPassID.sqlite3',
  did: {
    keyId: 'demo-myPassID'
  },
  minVersions: {
    mobile: '0.2.0'
  }
}
