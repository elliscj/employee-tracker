const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "root",
    database: "employee_db",
    port: 3306,
  },
  console.log(`Connected to the employee_db database.`)
);

module.exports = db;
