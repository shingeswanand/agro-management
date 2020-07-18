import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDetailsComponent } from './customer-details.component';
import {RouterModule} from '@angular/router';
import {CustomerDetailsRoutingModule,routes} from './customer-details-routing.module';


@NgModule({
  declarations: [CustomerDetailsComponent],
  imports: [
    CustomerDetailsRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerDetailsModule { }
