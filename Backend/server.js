var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const http = require('http');
const mysql = require('mysql');

// logger
var morgan = require('morgan');
// var db = require('./mySqlDb.js');
var app = express();
const router = express.Router();
const port = 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(bodyParser.json());
// app.use(express.static(__dirname + '/dist'));
// app.use(express.static(__dirname + '/customer_data'));
// app.use(express.static(__dirname + '/product_pictures'));
// app.use('/', express.static(__dirname + '/Digital HallMark Frontend/dist/'));

// const customerManagement = require('./models/customerManagement');
// app.use('/customerManagement', customerManagement);

// const receipts = require('./models/receipts');
// app.use('/receipts', receipts);

const auth = require('./api/auth/login');
app.use('/login', auth);

// const setting = require('./models/setting');
// app.use('/setting', setting);

// let connection = mysql.createConnection({
//     host: 'ec2-13-229-82-245.ap-southeast-1.compute.amazonaws.com',
//     user: 'kaustubhAgro',
//     password: 'kaustubhAgro@123',
//     database: 'KaustubhAgroDB',
//     port: '3306',
//     acquireTimeout: 90000 //30 secs
// });

// connection.connect(function(err) {
//     if (err) {
//         return console.error('error: ' + err);
//     }
//     console.log('Connected to the MySQL server.');
// });

const server = http.createServer(app);
server.listen(port, () => console.log('Running at 8000'));