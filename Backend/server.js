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

const company = require('./api/company/company_details');
app.use('/company', company);

const bankMaster = require('./api/bankMaster/bankMaster.router');
app.use('/bankMaster', bankMaster);

const customer = require('./api/customer/customer.router');
app.use('/customer', customer);

const products = require('./api/products/products.router');
app.use('/products', products);


const saleInvoice = require('./api/saleInvoice/saleInvoice.router');
app.use('/saleInvoice', saleInvoice);


const server = http.createServer(app);
server.listen(port, () => console.log('Running at 8000'));