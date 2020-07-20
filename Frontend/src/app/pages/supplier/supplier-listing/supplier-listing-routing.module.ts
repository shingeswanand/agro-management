import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierListingComponent } from './supplier-listing.component';

export const routes: Routes = [
	{
		path: '',
		component: SupplierListingComponent,
		data: {
			title: 'Supplier Listing'
		}
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class SupplierListingRoutingModule {}
