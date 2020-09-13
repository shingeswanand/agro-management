import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class CustomerService {
	constructor(private httpClient: HttpClient) {}

	saveOrUpdateCustomerDetails(data) {
		return this.httpClient.post(environment.apiBaseUrl + 'customer/saveOrUpdateCustomerDetails', data);
	}

	fetchCustomerList() {
		let company_id = atob(localStorage.getItem('companyId'));
		return this.httpClient.get(environment.apiBaseUrl + 'customer/fetchCustomerList?company_id=' + company_id);
	}

	searchCustomer(search_key) {
		let company_id = atob(localStorage.getItem('companyId'));
		return this.httpClient.get(
			environment.apiBaseUrl + 'customer/searchCustomer?company_id=' + company_id + '&&search_key=' + search_key
		);
	}

	fetchCustomerDetails(customerId) {
		let companyId = atob(localStorage.getItem('companyId'));
		return this.httpClient.get(
			environment.apiBaseUrl +
				'customer/fetchCustomerDetails?customerId=' +
				customerId +
				'&&companyId=' +
				companyId
		);
	}

	deleteCustomer(customerId) {
		let companyId = atob(localStorage.getItem('companyId'));

		let customerDetailsToRemove = {
			customerId: customerId,
			companyId: companyId
		};
		return this.httpClient.post(environment.apiBaseUrl + 'customer/deleteCustomer', customerDetailsToRemove);
	}
}
