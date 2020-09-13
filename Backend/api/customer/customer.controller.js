const {
    saveCustomerDetails,
    updateCustomerDetails,
    fetchCustomerDetails,
    fetchCustomerList,
    deleteCustomer,
    searchCustomer
} = require('./customer.service');

module.exports = {
    saveOrUpdateCustomerDetails: (req, res) => {
        const customerDetails = req.body;
        if (customerDetails.customer_id == undefined) {
            saveCustomerDetails(customerDetails, (err, results) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                return res.json({
                    success: 'Customer details saved successfully.'
                });
            });
        } else {
            updateCustomerDetails(customerDetails, (err, results) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                return res.json({
                    success: 'Customer details updated successfully.'
                });
            });
        }
    },
    fetchCustomerDetails: (req, res) => {
        const customerDetails = req.query;
        fetchCustomerDetails(customerDetails, (err, results) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            return res.json(results);
        });
    },
    fetchCustomerList: (req, res) => {
        const customerDetails = req.query;
        fetchCustomerList(customerDetails, (err, results) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            return res.json(results);
        });
    },
    deleteCustomer: (req, res) => {
        const customerDetails = req.body;
        deleteCustomer(customerDetails, (err, results) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            return res.json({
                success: 'Customer details removed successfully.'
            });
        });
    },
    searchCustomer: (req, res) => {
        const customerDetails = req.query;
        searchCustomer(customerDetails, (err, results) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            return res.json(results);
        });
    }
};