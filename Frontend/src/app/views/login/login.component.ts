import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';


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
	loading:boolean=false;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private authenticationService: AuthenticationService,
		private toastrService:ToastrService,
		private ngxLoader:NgxUiLoaderService
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
		this.ngxLoader.start();
		this.loading=true;
		this.authenticationService.login(loginData).subscribe(
			(data) => {
				this.ngxLoader.stop();
				this.loading=false;
				this.toastrService.success("You are successful logged in.", 'Logged In!'); 
				localStorage.setItem('companyId', btoa(data[0]['company_id']));
				localStorage.setItem('userId', btoa(data[0]['user_id']));
				localStorage.setItem('userName', btoa(data[0]['user_name']));
				localStorage.setItem('userPassword', btoa(data[0]['user_password']));
				localStorage.setItem('userRole', btoa(data[0]['user_role']));
				localStorage.setItem('companyName', btoa(data[0]['company_name']));
				this.router.navigate([ '/dashboard' ]);
			},
			(error) => {
				this.toastrService.error(error.message, 'Error!'); // show error message
				this.ngxLoader.stop();
				this.loading=false;
			}
		);
	}
}
