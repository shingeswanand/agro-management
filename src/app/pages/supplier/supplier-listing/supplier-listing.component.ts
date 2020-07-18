import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-supplier-listing',
  templateUrl: './supplier-listing.component.html',
  styleUrls: ['./supplier-listing.component.css']
})
export class SupplierListingComponent implements OnInit {

  constructor(public translate:TranslateService) { }

  ngOnInit(): void {
  }

}
