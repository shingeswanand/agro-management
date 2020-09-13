var connection = require('../../db/database');

module.exports = {
    fetchProductsForSaleInvoice: (searchDetails, callBack) => {
        let fetchProductsForSaleInvoiceQuery =
            "select * from product_master where company_id='" + searchDetails.company_id + "'";
        connection.query(fetchProductsForSaleInvoiceQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    }
};