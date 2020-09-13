import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class SaleInvoiceService {
	constructor(private httpClient: HttpClient) {}

	getDetailsForSaleInvoice() {
		let company_id = atob(localStorage.getItem('companyId'));
		return this.httpClient.get(
			environment.apiBaseUrl + 'saleInvoice/getDetailsForSaleInvoice?companyId=' + company_id
		);
	}

	getDetailsOfSaleInvoice(invoice_no) {
		let company_id = atob(localStorage.getItem('companyId'));
		return this.httpClient.get(
			environment.apiBaseUrl +
				'saleInvoice/getDetailsOfSaleInvoice?companyId=' +
				company_id +
				'&&invoice_no=' +
				invoice_no
		);
	}

	saveSaleInvoiceDetails(saleDetails) {
		return this.httpClient.post(environment.apiBaseUrl + 'saleInvoice/saveSaleInvoiceDetails', saleDetails);
	}

	fetchSaleInvoices() {
		let company_id = atob(localStorage.getItem('companyId'));
		return this.httpClient.get(environment.apiBaseUrl + 'saleInvoice/fetchSaleInvoices?companyId=' + company_id);
	}
}
