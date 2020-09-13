const {
    getDetailsForSaleInvoice,
    saveSaleInvoice,
    updateSaleInvoice,
    fetchSaleInvoices,
    getDetailsOfSaleInvoice
} = require('./saleInvoice.service');

module.exports = {
    getDetailsForSaleInvoice: (req, res) => {
        const companyId = req.query.companyId;
        getDetailsForSaleInvoice(companyId, (err, results) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: err.message });
                return;
            }
            return res.json(results);
        });
    },
    getDetailsOfSaleInvoice: (req, res) => {
        getDetailsOfSaleInvoice(req.query, (err, results) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: err.message });
                return;
            }
            return res.json(results);
        });
    },
    saveSaleInvoiceDetails: (req, res) => {
        const flag = req.body.saveOrUpdate;
        if (flag == 1) {
            saveSaleInvoice(req.body, (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ error: err.message });
                    return;
                }
                return res.json({
                    success: 'Sale details saved successfully.'
                });
            });
        } else {
            updateSaleInvoice(req.body, (err, results) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ error: err.message });
                    return;
                }
                return res.json({
                    success: 'Sale details updated successfully.'
                });
            });
        }
    },
    fetchSaleInvoices: (req, res) => {
        const companyId = req.query.companyId;
        fetchSaleInvoices(companyId, (err, results) => {
            if (err) {
                console.log(err);
                res.status(400).json({ error: err.message });
                return;
            }
            return res.json(results);
        });
    }
};