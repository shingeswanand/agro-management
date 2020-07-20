import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListingComponent } from './customer-listing.component';

export const routes: Routes = [
	{
		path: '',
		component: CustomerListingComponent,
		data: {
			title: 'Customer Listing'
		}
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class CustomerListingRoutingModule {}
