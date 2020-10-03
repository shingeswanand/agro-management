import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class MastersService {
	constructor(private httpClient: HttpClient) {}
	fetchProductList() {
		let company_id = atob(localStorage.getItem('companyId'));
		return this.httpClient.get(
			environment.apiBaseUrl + 'products/fetchProductsForSaleInvoice?company_id=' + company_id
		);
	}

	saveOrUpdateProductDetails(productDetailsToSubmit) {
		return this.httpClient.post(
			environment.apiBaseUrl + 'products/saveOrUpdateProductDetails',
			productDetailsToSubmit
		);
	}
}
