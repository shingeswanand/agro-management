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
    },
    saveProductDetails: (product_details, callBack) => {
        let saveProductDetailsQuery =
            "insert into product_master set company_id='" +
            product_details.company_id +
            "',product_name='" +
            product_details.product_name +
            "',product_description='" +
            product_details.product_description +
            "',hsn_or_sac_code='" +
            product_details.hsn_or_sac_code +
            "',record_updated_by='" +
            product_details.record_updated_by +
            "',record_updated_date='" +
            product_details.record_updated_date +
            "'";
        connection.query(saveProductDetailsQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, true);
        });
    },
    updateProductDetails: (product_details, callBack) => {
        let updateProductDetailsQuery =
            "update product_master set product_name='" +
            product_details.product_name +
            "',product_description='" +
            product_details.product_description +
            "',hsn_or_sac_code='" +
            product_details.hsn_or_sac_code +
            "',record_updated_by='" +
            product_details.record_updated_by +
            "',record_updated_date='" +
            product_details.record_updated_date +
            "' where company_id='" + product_details.company_id + "' AND product_id='" + product_details.product_id + "'";
        connection.query(updateProductDetailsQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, true);
        });
    }
};