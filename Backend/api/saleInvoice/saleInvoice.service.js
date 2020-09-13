var connection = require('../../db/database');

module.exports = {
    fetchSaleInvoices: (companyId, callBack) => {
        let fetchSaleInvoicesQuery =
            "select invoice_no,invoice_id,DATE_FORMAT(invoice_date,'%d/%m/%Y') as invoice_date,customer_name from sale_invoice_master inner join customer_details_2 on customer_details_2.company_id=sale_invoice_master.company_id AND customer_details_2.customer_id=sale_invoice_master.customer_id where sale_invoice_master.company_id='" +
            companyId +
            "'";
        connection.query(fetchSaleInvoicesQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    getDetailsForSaleInvoice: (companyId, callBack) => {
        let getDetailsForSaleInvoiceQuery =
            "select company_master.*,company_details.* from company_master inner join company_details on company_details.company_id=company_master.company_id where company_master.company_id='" +
            companyId +
            "';select max(invoice_id) as max_invoice_id from sale_invoice_master where company_id='" +
            companyId +
            "'";
        connection.query(getDetailsForSaleInvoiceQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    getDetailsOfSaleInvoice: (invoice_query_params, callBack) => {
        let getDetailsOfSaleInvoiceQuery =
            "select sale_invoice_master.*,customer_details_2.*,concat(customer_details_2.customer_id,'-',customer_details_2.customer_name) as customer_id_name from sale_invoice_master inner join customer_details_2 on customer_details_2.company_id=sale_invoice_master.company_id AND customer_details_2.customer_id=sale_invoice_master.customer_id  where sale_invoice_master.company_id='" +
            invoice_query_params.companyId +
            "' AND invoice_no='" +
            invoice_query_params.invoice_no +
            "';select product_id,product_name,hsn_or_sac_code,product_amount as total,product_quantity as quantity,product_rate as rate,rate_per_unit as ratePerUnit,quantity_unit as quantityPerUnit from sale_invoice_details where company_id='" +
            invoice_query_params.companyId +
            "' AND invoice_no='" +
            invoice_query_params.invoice_no +
            "';select company_master.*,company_details.* from company_master inner join company_details on company_details.company_id=company_master.company_id where company_master.company_id='" +
            invoice_query_params.companyId +
            "'";
        connection.query(getDetailsOfSaleInvoiceQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
        });
    },
    saveSaleInvoice: (saleDetails, callBack) => {
        let saveSaleInvoiceMasterDetailsQuery =
            "insert into sale_invoice_master set invoice_no='" +
            saleDetails.invoice_no +
            "',invoice_id='" +
            saleDetails.invoice_id +
            "',company_id='" +
            saleDetails.company_id +
            "',invoice_date=" +
            saleDetails.invoice_date +
            ",eWayBillNumber='" +
            saleDetails.eWayBillNumber +
            "',dispatch_through='" +
            saleDetails.dispatch_through +
            "',vehicle_number='" +
            saleDetails.vehicle_number +
            "',customer_id='" +
            saleDetails.customer_id +
            "',payment_mode='" +
            saleDetails.payment_mode +
            "',cash_payment_date=" +
            saleDetails.cash_payment_date +
            ',neft_payment_date=' +
            saleDetails.neft_payment_date +
            ",neft_transaction_number='" +
            saleDetails.neft_transaction_number +
            "',company_bank_id='" +
            saleDetails.company_bank_id +
            "',cheque_number='" +
            saleDetails.cheque_number +
            "',cheque_date=" +
            saleDetails.cheque_date +
            ",upi_transaction_id='" +
            saleDetails.upi_transaction_id +
            "',upi_payment_date=" +
            saleDetails.upi_payment_date +
            ",record_updated_by='" +
            saleDetails.record_updated_by +
            "',record_updated_date='" +
            saleDetails.record_updated_date +
            "',cgst_rate='" +
            saleDetails.cgst_rate +
            "',cgst_amount='" +
            saleDetails.cgst_amount +
            "',sgst_rate='" +
            saleDetails.sgst_rate +
            "',sgst_amount='" +
            saleDetails.sgst_amount +
            "',igst_rate='" +
            saleDetails.igst_rate +
            "',igst_amount='" +
            saleDetails.igst_amount +
            "',grand_total='" +
            saleDetails.grand_total +
            "',total_amount_excluding_tax='" +
            saleDetails.total_amount_excluding_tax +
            "',total_quantity='" +
            saleDetails.total_quantity +
            "',total_quantity_unit='" +
            saleDetails.total_quantity_unit +
            "'";
        connection.query(saveSaleInvoiceMasterDetailsQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            } else {
                var product_details = saleDetails.product_details;
                if (product_details.length > 0) {
                    for (let index = 0; index < product_details.length; index++) {
                        let saveSaleInvoiceSubDetailsQuery =
                            "insert into sale_invoice_details set invoice_no='" +
                            saleDetails.invoice_no +
                            "',company_id='" +
                            saleDetails.company_id +
                            "',product_id=" +
                            product_details[index].product_id +
                            ",product_quantity='" +
                            product_details[index].quantity +
                            "',product_rate='" +
                            product_details[index].rate +
                            "',product_amount='" +
                            product_details[index].total +
                            "',record_updated_date='" +
                            saleDetails.record_updated_date +
                            "',record_updated_by='" +
                            saleDetails.record_updated_by +
                            "',quantity_unit='" +
                            product_details[index].quantityPerUnit +
                            "',rate_per_unit='" +
                            product_details[index].ratePerUnit +
                            "',product_name='" +
                            product_details[index].product_name +
                            "',hsn_or_sac_code='" +
                            product_details[index].hsn_or_sac_code +
                            "'";
                        connection.query(saveSaleInvoiceSubDetailsQuery, (error, results, fields) => {
                            if (error) {
                                callBack(error);
                                console.log(error);
                            }
                        });
                    }
                }
                return callBack(null, true);
            }
        });
    },
    updateSaleInvoice: (saleDetails, callBack) => {
        let updateSaleInvoiceMasterDetailsQuery =
            "update sale_invoice_master set invoice_date=" +
            saleDetails.invoice_date +
            ",eWayBillNumber='" +
            saleDetails.eWayBillNumber +
            "',dispatch_through='" +
            saleDetails.dispatch_through +
            "',vehicle_number='" +
            saleDetails.vehicle_number +
            "',customer_id='" +
            saleDetails.customer_id +
            "',payment_mode='" +
            saleDetails.payment_mode +
            "',cash_payment_date=" +
            saleDetails.cash_payment_date +
            ',neft_payment_date=' +
            saleDetails.neft_payment_date +
            ",neft_transaction_number='" +
            saleDetails.neft_transaction_number +
            "',company_bank_id='" +
            saleDetails.company_bank_id +
            "',cheque_number='" +
            saleDetails.cheque_number +
            "',cheque_date=" +
            saleDetails.cheque_date +
            ",upi_transaction_id='" +
            saleDetails.upi_transaction_id +
            "',upi_payment_date=" +
            saleDetails.upi_payment_date +
            ",record_updated_by='" +
            saleDetails.record_updated_by +
            "',record_updated_date='" +
            saleDetails.record_updated_date +
            "',cgst_rate='" +
            saleDetails.cgst_rate +
            "',cgst_amount='" +
            saleDetails.cgst_amount +
            "',sgst_rate='" +
            saleDetails.sgst_rate +
            "',sgst_amount='" +
            saleDetails.sgst_amount +
            "',igst_rate='" +
            saleDetails.igst_rate +
            "',igst_amount='" +
            saleDetails.igst_amount +
            "',grand_total='" +
            saleDetails.grand_total +
            "',total_amount_excluding_tax='" +
            saleDetails.total_amount_excluding_tax +
            "',total_quantity='" +
            saleDetails.total_quantity +
            "',total_quantity_unit='" +
            saleDetails.total_quantity_unit +
            "' where invoice_no='" +
            saleDetails.invoice_no +
            "' AND invoice_id='" +
            saleDetails.invoice_id +
            "' AND company_id='" +
            saleDetails.company_id +
            "';delete from sale_invoice_details where invoice_no='" +
            saleDetails.invoice_no +
            "' AND company_id='" +
            saleDetails.company_id + "'";
        connection.query(updateSaleInvoiceMasterDetailsQuery, (error, results, fields) => {
            if (error) {
                callBack(error);
            } else {
                var product_details = saleDetails.product_details;
                if (product_details.length > 0) {
                    for (let index = 0; index < product_details.length; index++) {
                        let saveSaleInvoiceSubDetailsQuery =
                            "insert into sale_invoice_details set invoice_no='" +
                            saleDetails.invoice_no +
                            "',company_id='" +
                            saleDetails.company_id +
                            "',product_id=" +
                            product_details[index].product_id +
                            ",product_quantity='" +
                            product_details[index].quantity +
                            "',product_rate='" +
                            product_details[index].rate +
                            "',product_amount='" +
                            product_details[index].total +
                            "',record_updated_date='" +
                            saleDetails.record_updated_date +
                            "',record_updated_by='" +
                            saleDetails.record_updated_by +
                            "',quantity_unit='" +
                            product_details[index].quantityPerUnit +
                            "',rate_per_unit='" +
                            product_details[index].ratePerUnit +
                            "',product_name='" +
                            product_details[index].product_name +
                            "',hsn_or_sac_code='" +
                            product_details[index].hsn_or_sac_code +
                            "'";
                        connection.query(saveSaleInvoiceSubDetailsQuery, (error, results, fields) => {
                            if (error) {
                                callBack(error);
                                console.log(error);
                            }
                        });
                    }
                }
                return callBack(null, true);
            }
        });
    }
};