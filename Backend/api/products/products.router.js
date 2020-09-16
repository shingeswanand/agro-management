const router = require('express').Router();
const { fetchProductsForSaleInvoice, saveOrUpdateProductDetails } = require('./products.controller');

router.get('/fetchProductsForSaleInvoice', fetchProductsForSaleInvoice);
router.post('/saveOrUpdateProductDetails', saveOrUpdateProductDetails);

module.exports = router;