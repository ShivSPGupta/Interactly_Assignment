const { configDotenv } = require("dotenv");
const mysql = require("mysql2/promise");
configDotenv('../process.env')

const DbPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.PASS,
    database:"contacts",
});

module.exports = DbPool;