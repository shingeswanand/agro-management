const { fetchProductsForSaleInvoice } = require('./products.service');

module.exports = {
    fetchProductsForSaleInvoice: (req, res) => {
        const searchDetails = req.query;
        fetchProductsForSaleInvoice(searchDetails, (err, results) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            return res.json(results);
        });
    }
}