import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListingComponent } from './customer-listing.component';
import { RouterModule } from '@angular/router';
import { CustomerListingRoutingModule, routes } from './customer-listing-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
	declarations: [ CustomerListingComponent ],
	imports: [
		TranslateModule,
		CustomerListingRoutingModule,
		RouterModule.forChild(routes),
		MatTableModule,
		MatPaginatorModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule
	]
})
export class CustomerListingModule {}
