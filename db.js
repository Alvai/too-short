// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create User Table
 */
const createUrlsTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      urls(
        id UUID PRIMARY KEY,
        originalUrl VARCHAR(255) NOT NULL,
        urlCode VARCHAR(128) UNIQUE NOT NULL,
        shortUrl VARCHAR(255) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop User Table
 */
const dropUrlsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS urls returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createUrlsTable,
  dropUrlsTable
};