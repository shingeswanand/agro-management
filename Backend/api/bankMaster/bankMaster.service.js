var connection = require('../../db/database');

module.exports = {
    saveCompanyBankDetails: (bank_details, callBack) => {
        let saveCompanyBankDetailsQuery =
            "insert into company_bank_details set company_id='" + bank_details.company_id + "',bank_name='" + bank_details.bank_name + "',branch_name='" + bank_details.branch_name + "',branch_address='" + bank_details.branch_address + "',account_holder_name='" + bank_details.account_holder_name + "',account_number='" + bank_details.account_number + "',ifsc_code='" + bank_details.ifsc_code + "',record_updated_by='" + bank_details.record_updated_by + "',record_updated_date='" + bank_details.record_updated_date + "'";
        connection.query(saveCompanyBankDetailsQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, true);
        });
    },
    updateCompanyBankDetails: (bank_details, callBack) => {
        let updateCompanyBankDetailsQuery =
            "update company_bank_details set bank_name='" + bank_details.bank_name + "',branch_name='" + bank_details.branch_name + "',branch_address='" + bank_details.branch_address + "',account_holder_name='" + bank_details.account_holder_name + "',account_number='" + bank_details.account_number + "',ifsc_code='" + bank_details.ifsc_code + "',record_updated_by='" + bank_details.record_updated_by + "',record_updated_date='" + bank_details.record_updated_date + "' where company_id='" + bank_details.company_id + "' AND bank_id='" + bank_details.bank_id + "'";
        connection.query(updateCompanyBankDetailsQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, true);
        });
    },
    fetchCompanyBankList: (bank_details, callBack) => {
        let fetchCompanyBankListQuery =
            "select * from company_bank_details where company_id='" + bank_details.company_id + "'";
        connection.query(fetchCompanyBankListQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    deleteCompanyBankDetails: (bank_details, callBack) => {
        let deleteCompanyBankDetailsQuery =
            "delete from company_bank_details where company_id='" + bank_details.company_id + "' AND bank_id='" + bank_details.bank_id + "'";
        connection.query(deleteCompanyBankDetailsQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, true);
        });
    }
};