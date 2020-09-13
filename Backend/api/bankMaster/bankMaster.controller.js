const { saveCompanyBankDetails, updateCompanyBankDetails, fetchCompanyBankList, deleteCompanyBankDetails } = require('./bankMaster.service');

module.exports = {
    saveOrUpdateCompanyBankDetails: (req, res) => {
        const bank_details = req.body;
        if (bank_details.bank_id == undefined) {
            saveCompanyBankDetails(bank_details, (err, results) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                return res.json({
                    success: 'Bank details saved successfully.'
                });
            });
        } else {
            updateCompanyBankDetails(bank_details, (err, results) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                }
                return res.json({
                    success: 'Bank details updated successfully.'
                });
            });
        }
    },
    fetchCompanyBankList: (req, res) => {
        const bank_details = req.query;
        fetchCompanyBankList(bank_details, (err, results) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            return res.json(results);
        });
    },
    deleteCompanyBankDetails: (req, res) => {
        const bank_details = req.body;
        deleteCompanyBankDetails(bank_details, (err, results) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            return res.json({
                success: 'Bank details removed successfully.'
            });
        });
    }
}