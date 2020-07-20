import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: [ './login.component.css' ]

})
export class LoginComponent { 

  username: any;
	password: any;
  loginDetails: any;
  
  constructor(private router: Router) {}
  
  	ngOnInit() {
        
  }

  
	login() {

  if(this.username=='' || this.username==undefined)
  {
    alert("Please enter user name");
    return;
  }
  if(this.password=='' || this.password==undefined)
  {
    alert("Please enter password");
    return;

  }
  
  this.router.navigate([ '/dashboard' ]);

}
}
