const express = require('express');
const mysql = require('mysql');
const config = require('./dbconfig.js');

var con = mysql.createPool({
    host: config.env_vars.host,
    user: config.env_vars.user,
    password: config.env_vars.password,
    database: config.env_vars.database,
    port: config.env_vars.port,
    multipleStatements: true
});

module.exports = con;