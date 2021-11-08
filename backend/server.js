const backend = require('./src')
const { serverPort } = require('./config')

backend.listen(serverPort,
  () => console.log(`myPass.ID backend running on port ${serverPort}!`)
)
