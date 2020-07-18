import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerComponent } from './owner.component';
export const routes: Routes = [
	{
		path: '',
		component: OwnerComponent,
		data: {
			title: 'Owner Details'
		}
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class OwnerRoutingModule {}
