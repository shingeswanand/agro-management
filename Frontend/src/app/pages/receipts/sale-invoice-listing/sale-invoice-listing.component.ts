import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SaleInvoiceService } from '../../../services/sale-invoice/sale-invoice.service';

@Component({
	selector: 'app-sale-invoice-listing',
	templateUrl: './sale-invoice-listing.component.html',
	styleUrls: [ './sale-invoice-listing.component.css' ]
})
export class SaleInvoiceListingComponent implements OnInit {
	displayedColumns: string[] = [ 'ID', 'Invoice No.', 'Invoice Date', 'Customer Name','Status','Action' ];
	status:string[]=['','Pending','Payment Done & Delivery InProgress','Payment Pending & Product Delivered','Payment Pending & Delivery InProgress','Completed'];
	length: any;
	pageSize: any = 5;
	ds: any = [];

	dataSource = new MatTableDataSource<PeriodicElement>();

	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public toastrService: ToastrService,
		private ngxLoader: NgxUiLoaderService,
		private saleInvoiceService: SaleInvoiceService
	) {}

	ngOnInit() {
		this.ngxLoader.start();
		this.fetchSaleInvoicesList();
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	};

	editSaleInvoice(invoice_no) {
		this.router.navigate([ '/receipts/sale_invoice', { invoice_no: btoa(invoice_no) } ]);
	}

	fetchSaleInvoicesList() {
		this.saleInvoiceService.fetchSaleInvoices().subscribe(
			(data) => {
				this.ds = data;
				this.dataSource = new MatTableDataSource<PeriodicElement>(this.ds);
				this.length = this.ds.length;
				this.dataSource.paginator = this.paginator;
				this.ngxLoader.stop();
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
				this.ngxLoader.stop();
			}
		);
	}
	createSaleInvoice() {
		this.router.navigate([ 'receipts/sale_invoice' ]);
	}
}

export interface PeriodicElement {}

const ELEMENT_DATA: PeriodicElement[] = [];
