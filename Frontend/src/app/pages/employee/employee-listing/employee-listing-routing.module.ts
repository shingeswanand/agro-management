import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListingComponent } from './employee-listing.component';

export const routes: Routes = [
	{
		path: '',
		component: EmployeeListingComponent,
		data: {
			title: 'Employee Listing'
		}
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class EmployeeListingRoutingModule {}
