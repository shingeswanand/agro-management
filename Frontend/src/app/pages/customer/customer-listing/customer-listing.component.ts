import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.css']
})
export class CustomerListingComponent implements OnInit {

  constructor(private router:Router,public translate:TranslateService) { }

  ngOnInit(): void {
  }

  add_customer()
  {
    this.router.navigate(["/customer_details"]);    
  }

}
