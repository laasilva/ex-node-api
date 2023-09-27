const config = require('config');
const Pool = require('pg').Pool

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const pool = new Pool({
  user: config.get('server.database.user'),
  host: config.get('server.database.host'),
  database: config.get('server.database.name'),
  password: config.get('server.database.pass'),
  port: config.get('server.database.port'),
  ssl: true
})

module.exports = pool;