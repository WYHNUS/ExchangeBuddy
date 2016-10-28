// Load environment variables
require('dotenv').config();

const config = require('../config')
const server = require('../server/main')
const https = require('https');
const debug = require('debug')('app:bin:server')
const fs = require('fs')
const port = config.server_port

const options = {
    key: fs.readFileSync('bin/key.pem'),
    cert: fs.readFileSync('bin/cert.pem')
}

https.createServer(options, (req, res) => {
}).listen(port);
debug(`Server is now running at http://localhost:${port}.`)
