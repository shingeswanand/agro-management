import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.css']
})
export class EmployeeListingComponent implements OnInit {

  constructor(public translate:TranslateService,private router:Router) { }

  ngOnInit(): void {
  }

  goForEmployeeDetails()
  {
    this.router.navigate(['/employee_details'])
  }

}
