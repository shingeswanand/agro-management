import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from './employee-details.component';
import {EmployeeDetailsRoutingModule,routes} from './employee-details-routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [EmployeeDetailsComponent],
  imports: [
    CommonModule,
    EmployeeDetailsRoutingModule,
    RouterModule.forChild(routes),

  ]
})
export class EmployeeDetailsModule { }
