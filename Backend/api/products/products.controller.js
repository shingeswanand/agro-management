const { fetchProductsForSaleInvoice, saveProductDetails, updateProductDetails } = require('./products.service');

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
    },
    saveOrUpdateProductDetails: (req, res) => {
        const productDetails = req.body;
        if (productDetails.product_id == undefined) {
            saveProductDetails(productDetails, (err, results) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                return res.json({ "success": "Product added successfully." });
            });
        } else {
            updateProductDetails(productDetails, (err, results) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                return res.json({ "success": "Product updated successfully." });

            });

        }
    }
}