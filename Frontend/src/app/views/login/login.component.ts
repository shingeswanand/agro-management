import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as jwt_decode from 'jwt-decode';

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
	loading: boolean = false;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private authenticationService: AuthenticationService,
		private toastrService: ToastrService,
		private ngxLoader: NgxUiLoaderService
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
			email: this.loginForm.value['username'],
			password: this.loginForm.value['password']
		};
		this.ngxLoader.start();
		this.loading = true;
		this.authenticationService.login(loginData).subscribe(
			(data) => {
				this.ngxLoader.stop();
				this.loading = false;
				this.toastrService.success('You are successful logged in.', 'Logged In!');
				localStorage.setItem('companyId', btoa(data['companyid']));
				localStorage.setItem('userId', btoa(data['userid']));
				localStorage.setItem('userName', btoa(data['username']));
				localStorage.setItem('accessToken', data['accessToken']);
				localStorage.setItem('userRole', btoa(data['userrole']));
				localStorage.setItem('companyName', btoa(data['companyname']));
				this.router.navigate([ '/dashboard' ]);
			},
			(error) => {
				this.toastrService.error(error.message, 'Error!'); // show error message
				this.ngxLoader.stop();
				this.loading = false;
			}
		);
	}
}
