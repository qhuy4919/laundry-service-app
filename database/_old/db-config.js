require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
    port: `${process.env.DB_PORT}`,
    host: `${process.env.DB_HOST}`,
    ssl: { rejectUnauthorized: false },
    max: 10,
})


module.exports = { pool };
