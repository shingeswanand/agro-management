import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MastersRoutingModule } from './masters-routing.module';
import { ProductMasterComponent } from './product-master/product-master.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BankMasterComponent } from './bank-master/bank-master.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [ ProductMasterComponent, BankMasterComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		ModalModule.forRoot(),
		MastersRoutingModule,
		Ng2SmartTableModule,
		MatTableModule,
		MatPaginatorModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule
	]
})
export class MastersModule {}
