// Load environment variables
require('dotenv').config();

const config = require('../config')
const server = require('../server/main')
const debug = require('debug')('app:bin:server')
const https = require('https')
const port = config.server_port
const fs = require('fs')

const options = {
    key: fs.readFileSync('bin/key.pem'),
    cert: fs.readFileSync('bin/cert.pem')
}

const httpsServer = https.createServer(options, server)
httpsServer.listen(port)
debug(`Server is now running at https://localhost:${port}.`)
