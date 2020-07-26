import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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

	constructor(private router: Router, private fb: FormBuilder) {}

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

		this.router.navigate([ '/dashboard' ]);
	}
}
