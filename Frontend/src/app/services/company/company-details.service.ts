import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CompanyDetailsService {
	constructor(private httpClient: HttpClient) {}

	getOwnerDetails(companyId) {
		return this.httpClient.get(environment.apiBaseUrl + 'company/getCompanyOwnerDetails?companyId=' + companyId);
	}

	getCompanyDetails(companyId) {
		return this.httpClient.get(environment.apiBaseUrl + 'company/getCompanyDetails?companyId=' + companyId);
	}

	saveOrUpdateCompanyDetails(data) {
		return this.httpClient.post(environment.apiBaseUrl + 'company/saveOrUpdateCompanyDetails', data);
	}

	saveOrUpdateCompanyOwnerDetails(data) {
		return this.httpClient.post(environment.apiBaseUrl + 'company/saveOrUpdateCompanyOwnerDetails', data);
	}
}
