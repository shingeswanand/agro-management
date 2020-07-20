import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './customer-details.component';

export const routes: Routes = [
	{
		path: '',
		component: CustomerDetailsComponent,
		data: {
			title: 'Customer Details'
		}
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class CustomerDetailsRoutingModule {}
