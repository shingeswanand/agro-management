import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
@Component({
	selector: 'app-dashboard',
	templateUrl: 'login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent {
	loginForm: FormGroup;

	username: any;
	password: any;
	loginDetails: any;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private authenticationService: AuthenticationService
	) {}

	ngOnInit() {
		this.loginForm = this.fb.group({
			username: [ '', Validators.required ],
			password: [ '', Validators.required ]
		});
	}

	login() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		let loginData = {
			userName: this.loginForm.value['username'],
			userPassword: this.loginForm.value['password']
		};
		console.log(loginData);

		this.authenticationService.login(loginData).subscribe(
			(data) => {
				console.log(data);
				localStorage.setItem('companyId', btoa(data[0]['company_id']));
				localStorage.setItem('userId', btoa(data[0]['user_id']));
				localStorage.setItem('userName', btoa(data[0]['user_name']));
				localStorage.setItem('userPassword', btoa(data[0]['user_password']));
				localStorage.setItem('userRole', btoa(data[0]['user_role']));
				localStorage.setItem('companyName', btoa(data[0]['company_name']));
				this.router.navigate([ '/dashboard' ]);
			},
			(error) => {
				//	this.toasterService.error(error.message, 'Error!'); // show error message
			}
		);
	}
}
