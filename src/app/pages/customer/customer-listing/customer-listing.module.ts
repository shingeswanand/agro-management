import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListingComponent } from './customer-listing.component';
import {RouterModule} from '@angular/router';
import {CustomerListingRoutingModule,routes} from './customer-listing-routing.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [CustomerListingComponent],
  imports: [
    TranslateModule,
    CustomerListingRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerListingModule { }
