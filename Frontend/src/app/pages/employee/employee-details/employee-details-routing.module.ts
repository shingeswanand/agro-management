import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details.component';

export const routes: Routes = [
	{
		path: '',
		component: EmployeeDetailsComponent,
		data: {
			title: 'Employee Details'
		}
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class EmployeeDetailsRoutingModule {}
