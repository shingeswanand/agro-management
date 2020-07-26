var dotenv = require('./../.env');
require('dotenv').config();

module.exports.env_vars = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    port: process.env.DB_PORT,
    backend_port: process.env.BACKEND_PORT
};