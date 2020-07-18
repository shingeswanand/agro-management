import { NgModule } from '@angular/core';
import { EmployeeListingComponent } from './employee-listing.component';
import {EmployeeListingRoutingModule,routes} from './employee-listing-routing.module';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [EmployeeListingComponent],
  imports: [
    TranslateModule,
    EmployeeListingRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeeListingModule { }
