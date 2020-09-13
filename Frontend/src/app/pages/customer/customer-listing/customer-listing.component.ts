import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../../../services/customer/customer.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
	selector: 'app-customer-listing',
	templateUrl: './customer-listing.component.html',
	styleUrls: [ './customer-listing.component.scss' ]
})
export class CustomerListingComponent implements OnInit {
	displayedColumns: string[] = [ 'ID', 'Name', 'Mobile No.', 'Address', 'Action' ];
	//dataSource = new MatTableDataSource<any>();
	length: any;
	pageSize: any = 5;
	ds: any = [];
	// @ViewChild(MatPaginator, { static: true })
	// paginator: MatPaginator;

	// displayedColumns: string[] = [ 'customer_name' ];
	dataSource = new MatTableDataSource<PeriodicElement>();

	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
	// @ViewChild(MatPaginator, { static: true })
	// set matPaginator(paginator: MatPaginator) {
	// 	this.dataSource.paginator = paginator;
	// }
	constructor(
		public toastrService: ToastrService,
		private ngxLoader: NgxUiLoaderService,
		private router: Router,
		public translate: TranslateService,
		private customerService: CustomerService
	) {}

	ngOnInit() {
		this.ngxLoader.start();
		this.customerService.fetchCustomerList().subscribe(
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
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		//this.dataSource = this.ds;
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	};

	add_customer() {
		this.router.navigate([ '/customer_details' ]);
	}

	editCustomer(customer_id) {
		this.router.navigate([ '/customer_details', { customer_id: btoa(customer_id) } ]);
	}

	deleteCustomer(customer_id) {
		this.customerService.deleteCustomer(customer_id).subscribe(
			(data) => {
				//		this.ds = data;
				//	this.length = this.ds.length;
				//	this.dataSource = new MatTableDataSource(this.ds);

				// this.getCompanyDetails();
				this.toastrService.success(data['success'], 'Success!');
				this.ngxLoader.stop();
				this.ngOnInit();
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
				this.ngxLoader.stop();
			}
		);
	}

	fetchCustomersList() {
		this.customerService.fetchCustomerList().subscribe(
			(data) => {
				//		this.ds = data;
				//	this.length = this.ds.length;
				//	this.dataSource = new MatTableDataSource(this.ds);

				// this.getCompanyDetails();
				//	this.toastrService.success(data['success'], 'Success!');
				this.ngxLoader.stop();
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
				this.ngxLoader.stop();
			}
		);
	}
}

export interface PeriodicElement {
	customer_name: string;
	// position: number;
	// weight: number;
	// symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [ { customer_name: 'Hydrogen' }, { customer_name: 'Helium' } ];
