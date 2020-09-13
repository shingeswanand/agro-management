import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class BankMasterService {
	constructor(private httpClient: HttpClient) {}

	fetchCompanyBankList() {
		let company_id = atob(localStorage.getItem('companyId'));
		return this.httpClient.get(environment.apiBaseUrl + 'bankMaster/fetchCompanyBankList?company_id=' + company_id);
	}

	saveOrUpdateCompanyBankDetails(bankDetails) {
		return this.httpClient.post(environment.apiBaseUrl + 'bankMaster/saveOrUpdateCompanyBankDetails', bankDetails);
	}
}
