const mysql = require("mysql2");

const db_connect = mysql.createConnection({
  host: process.env.APP_DB_HOST,
  user: process.env.APP_DB_USER,
  database: process.env.APP_DB_DATABASE,
  password: process.env.APP_DB_PASSWORD,
});

db_connect.connect();

module.exports = db_connect;
