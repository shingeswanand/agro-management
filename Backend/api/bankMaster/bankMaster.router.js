const router = require('express').Router();
const { saveOrUpdateCompanyBankDetails, fetchCompanyBankList, deleteCompanyBankDetails } = require('./bankMaster.controller');

router.post('/saveOrUpdateCompanyBankDetails', saveOrUpdateCompanyBankDetails);
router.get('/fetchCompanyBankList', fetchCompanyBankList);
router.post('/deleteCompanyBankDetails', deleteCompanyBankDetails);


module.exports = router;