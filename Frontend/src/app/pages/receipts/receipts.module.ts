import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptsRoutingModule, routes } from './receipts-routing.module';
import { CashMemoListingComponent } from './cash-memo-listing/cash-memo-listing.component';
import { MakeCashMemoComponent } from './make-cash-memo/make-cash-memo.component';
import { GstBillsListingComponent } from './gst-bills-listing/gst-bills-listing.component';
import { MakeGstBillComponent } from './make-gst-bill/make-gst-bill.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SaleInvoiceComponent } from './sale-invoice/sale-invoice.component';
import { SaleInvoiceListingComponent } from './sale-invoice-listing/sale-invoice-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//material components
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { DpDatePickerModule } from 'ng2-date-picker';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NumberToWordsPipe } from '../receipts/sale-invoice/number-to-words.pipe';
import { Daterangepicker } from 'ng2-daterangepicker';
@NgModule({
	declarations: [
		GstBillsListingComponent,
		MakeGstBillComponent,
		CashMemoListingComponent,
		MakeCashMemoComponent,
		SaleInvoiceComponent,
		SaleInvoiceListingComponent,
		NumberToWordsPipe
	],
	imports: [
		CommonModule,
		ReceiptsRoutingModule,
		FormsModule,
		MatButtonToggleModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatDividerModule,
		MatIconModule,
		MatButtonModule,
		RouterModule.forChild(routes),
		TranslateModule,
		MatStepperModule,
		MatDatepickerModule,
		MatNativeDateModule,
		DpDatePickerModule,
		AngularMyDatePickerModule,
		MyDatePickerModule,
		MatTableModule,
		MatPaginatorModule,
		MatFormFieldModule,
		MatInputModule,
		Daterangepicker
	],
	providers: [ NumberToWordsPipe ]
})
export class ReceiptsModule {}
