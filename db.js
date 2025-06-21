const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // это важно для Railway
  },
});

module.exports = pool;
// SQLite DB setup with employees table and is_admin field
