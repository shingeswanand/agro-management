import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductMasterComponent } from '../masters/product-master/product-master.component';
import { BankMasterComponent } from '../masters/bank-master/bank-master.component';
export const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'product_master',
				component: ProductMasterComponent,
				data: {
					title: 'Product Master'
				}
			},
			{
				path: 'bank_master',
				component: BankMasterComponent,
				data: {
					title: 'Bank Master'
				}
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class MastersRoutingModule {}
