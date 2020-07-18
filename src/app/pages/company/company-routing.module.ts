import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';

export const routes: Routes = [
	{
		path: '',
		component: CompanyComponent,
		data: {
			title: 'Company Details'
		}
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class CompanyRoutingModule {}
