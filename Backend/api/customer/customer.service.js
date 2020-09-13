var connection = require('../../db/database');

module.exports = {
    saveCustomerDetails: (customer_details, callBack) => {
        let saveCustomerDetailsQuery =
            "insert into customer_details_2 set company_id='" +
            customer_details.company_id +
            "',customer_name='" +
            customer_details.customer_name +
            "',customer_email='" +
            customer_details.customer_email +
            "',customer_address='" +
            customer_details.customer_address +
            "',customer_pin_code='" +
            customer_details.customer_pin_code +
            "',customer_tahsil='" +
            customer_details.customer_tahsil_name +
            "',customer_district='" +
            customer_details.customer_district_name +
            "',customer_state='" +
            customer_details.customer_state +
            "',customer_phone_no='" +
            customer_details.customer_phone_no +
            "',customer_mobile_no='" +
            customer_details.customer_mobile_no +
            "',customer_alt_mobile_no='" +
            customer_details.customer_alt_mobile_no +
            "',customer_adhaar_no='" +
            customer_details.customer_adhaar_card_no +
            "',customer_pan_no='" +
            customer_details.customer_pan_card_no +
            "',customer_gst_no='" +
            customer_details.customer_gst_no +
            "',record_updated_by='" +
            customer_details.record_updated_by +
            "',record_updated_date='" +
            customer_details.record_updated_date +
            "'";
        connection.query(saveCustomerDetailsQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, true);
        });
    },
    updateCustomerDetails: (customer_details, callBack) => {
        let updateCustomerDetailsQuery =
            "update customer_details_2 set customer_name='" +
            customer_details.customer_name +
            "',customer_email='" +
            customer_details.customer_email +
            "',customer_address='" +
            customer_details.customer_address +
            "',customer_pin_code='" +
            customer_details.customer_pin_code +
            "',customer_tahsil='" +
            customer_details.customer_tahsil_name +
            "',customer_district='" +
            customer_details.customer_district_name +
            "',customer_state='" +
            customer_details.customer_state +
            "',customer_phone_no='" +
            customer_details.customer_phone_no +
            "',customer_mobile_no='" +
            customer_details.customer_mobile_no +
            "',customer_alt_mobile_no='" +
            customer_details.customer_alt_mobile_no +
            "',customer_adhaar_no='" +
            customer_details.customer_adhaar_card_no +
            "',customer_pan_no='" +
            customer_details.customer_pan_card_no +
            "',customer_gst_no='" +
            customer_details.customer_gst_no +
            "',record_updated_by='" +
            customer_details.record_updated_by +
            "',record_updated_date='" +
            customer_details.record_updated_date +
            "' where company_id='" +
            customer_details.company_id +
            "' AND customer_id='" +
            customer_details.customer_id +
            "'";
        connection.query(updateCustomerDetailsQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, true);
        });
    },
    fetchCustomerDetails: (customer_details, callBack) => {
        let fetchCustomerDetailsQuery =
            "select * from customer_details_2 where company_id='" +
            customer_details.companyId +
            "' AND customer_id='" +
            customer_details.customerId +
            "'";
        connection.query(fetchCustomerDetailsQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
        });
    },
    fetchCustomerList: (customer_details, callBack) => {
        let fetchCustomerListQuery =
            "select * from customer_details_2 where company_id='" + customer_details.company_id + "'";
        connection.query(fetchCustomerListQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    deleteCustomer: (customer_details, callBack) => {
        let deleteCustomerDetailsQuery =
            "delete from customer_details_2 where company_id='" +
            customer_details.companyId +
            "' AND customer_id='" +
            customer_details.customerId +
            "'";
        connection.query(deleteCustomerDetailsQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, true);
        });
    },
    searchCustomer: (customer_details, callBack) => {
        let fetchCustomerListQuery =
            "select customer_details_2.*,concat(customer_details_2.customer_id,'-',customer_details_2.customer_name) as customer_id_name from customer_details_2 where company_id='" +
            customer_details.company_id +
            "' AND ( customer_name like '%" +
            customer_details.search_key +
            "%') LIMIT 10";
        connection.query(fetchCustomerListQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    }
};