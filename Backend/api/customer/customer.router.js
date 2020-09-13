const router = require('express').Router();
const {
    saveOrUpdateCustomerDetails,
    fetchCustomerDetails,
    fetchCustomerList,
    deleteCustomer,
    searchCustomer
} = require('./customer.controller');

router.post('/saveOrUpdateCustomerDetails', saveOrUpdateCustomerDetails);
router.get('/fetchCustomerDetails', fetchCustomerDetails);
router.get('/fetchCustomerList', fetchCustomerList);
router.get('/searchCustomer', searchCustomer);
router.post('/deleteCustomer', deleteCustomer);

module.exports = router;