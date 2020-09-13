const router = require('express').Router();
const { fetchProductsForSaleInvoice } = require('./products.controller');

router.get('/fetchProductsForSaleInvoice', fetchProductsForSaleInvoice);


module.exports = router;