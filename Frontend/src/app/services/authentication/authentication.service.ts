import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	constructor(private httpClient: HttpClient) {}

	login(data) {
		return this.httpClient.post(environment.apiBaseUrl + 'auth/login', data);
	}
}
