const router = require('express').Router();
const {
    getDetailsForSaleInvoice,
    saveSaleInvoiceDetails,
    fetchSaleInvoices,
    getDetailsOfSaleInvoice
} = require('./saleInvoice.controller');

router.get('/getDetailsForSaleInvoice', getDetailsForSaleInvoice);
router.get('/getDetailsOfSaleInvoice', getDetailsOfSaleInvoice);
router.get('/fetchSaleInvoices', fetchSaleInvoices);
router.post('/saveSaleInvoiceDetails', saveSaleInvoiceDetails);

module.exports = router;