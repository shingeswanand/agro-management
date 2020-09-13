import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GstBillsListingComponent } from '../receipts/gst-bills-listing/gst-bills-listing.component';
import { CashMemoListingComponent } from '../receipts/cash-memo-listing/cash-memo-listing.component';
import { MakeGstBillComponent } from './make-gst-bill/make-gst-bill.component';
import { MakeCashMemoComponent } from './make-cash-memo/make-cash-memo.component';
import { SaleInvoiceListingComponent } from './sale-invoice-listing/sale-invoice-listing.component';
import { SaleInvoiceComponent } from './sale-invoice/sale-invoice.component';
export const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'gst_bills',
				component: GstBillsListingComponent,
				data: {
					title: 'GST Bills'
				}
			},
			{
				path: 'create_gst_invoice',
				component: MakeGstBillComponent,
				data: {
					title: 'Make GST Invoice'
				}
			},
			{
				path: 'cash_memos',
				component: CashMemoListingComponent,
				data: {
					title: 'Cash Memos'
				}
			},
			{
				path: 'sale_invoice_listing',
				component: SaleInvoiceListingComponent,
				data: {
					title: 'Sale Invoice Listing'
				}
			},
			{
				path: 'sale_invoice',
				component: SaleInvoiceComponent,
				data: {
					title: 'Create Sale Invoice'
				}
			}
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class ReceiptsRoutingModule {}
