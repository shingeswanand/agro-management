import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerDetailsComponent } from './customer-details.component';
import {RouterModule} from '@angular/router';
import {CustomerDetailsRoutingModule,routes} from './customer-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CustomerDetailsComponent],
  imports: [
    CustomerDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerDetailsModule { }
