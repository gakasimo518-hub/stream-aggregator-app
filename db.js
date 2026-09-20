const { Pool } = require('pg');
const { db } = require('./config');

const pool = new Pool({
  connectionString: db.connectionString,
  ssl: db.ssl ? { rejectUnauthorized: false } : false
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};