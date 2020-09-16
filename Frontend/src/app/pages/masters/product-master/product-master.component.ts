import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MastersService } from '../../../services/masters/masters.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
	selector: 'app-product-master',
	templateUrl: './product-master.component.html',
	styleUrls: [ './product-master.component.css' ]
})
export class ProductMasterComponent implements OnInit {
	productFormDetails: FormGroup;
	@ViewChild('primaryModal') public primaryModal: ModalDirective;

	product_id: any;

	displayedColumns: string[] = [ 'ID', 'Name', 'Description', 'HSN', 'Action' ];
	length: any;
	ds: any = [];
	dataSource = new MatTableDataSource<PeriodicElement>();

	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;

	constructor(
		public toastrService: ToastrService,
		private ngxLoader: NgxUiLoaderService,
		private masterService: MastersService,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.productFormDetails = this.fb.group({
			product_name: [ '' ],
			product_description: [ '' ],
			hsn_or_sac_code: [ '' ]
		});
		this.ngxLoader.start();
		this.masterService.fetchProductList().subscribe(
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

	resetProductDetails() {
		this.productFormDetails.controls['product_name'].setValue('');
		this.productFormDetails.controls['product_description'].setValue('');
		this.productFormDetails.controls['hsn_or_sac_code'].setValue('');
		this.product_id = undefined;
	}

	editProduct(product_id) {
		var product_details;
		this.ds.map(function(e) {
			if (e.product_id == product_id) {
				product_details = e;
				//	return details;
			}
		});
		this.product_id = product_details.product_id;
		this.productFormDetails.controls['product_name'].setValue(product_details.product_name);
		this.productFormDetails.controls['product_description'].setValue(product_details.product_description);
		this.productFormDetails.controls['hsn_or_sac_code'].setValue(product_details.hsn_or_sac_code);
		this.primaryModal.show();
	}

	addProduct() {
		this.resetProductDetails();
		this.primaryModal.show();
	}

	submit_product_details() {
		this.ngxLoader.start();

		let productDetailsToSubmit = {
			company_id: atob(localStorage.getItem('companyId')),
			product_id: this.product_id,
			product_name: this.productFormDetails.controls['product_name'].value,
			product_description: this.productFormDetails.controls['product_description'].value,
			hsn_or_sac_code: this.productFormDetails.controls['hsn_or_sac_code'].value,
			record_updated_by: atob(localStorage.getItem('userId')),
			record_updated_date: new Date().toISOString().split('T')[0]
		};

		console.log(productDetailsToSubmit);

		this.masterService.saveOrUpdateProductDetails(productDetailsToSubmit).subscribe(
			(data) => {
				this.toastrService.success(data['success'], 'Success!');
				this.fetchProductList();
				this.resetProductDetails();
				this.primaryModal.hide();
				// this.ds = data;
				// this.dataSource = new MatTableDataSource<PeriodicElement>(this.ds);
				// this.length = this.ds.length;

				// this.dataSource.paginator = this.paginator;
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

	fetchProductList() {
		this.masterService.fetchProductList().subscribe(
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
}
export interface PeriodicElement {
	product_name: string;
	// position: number;
	// weight: number;
	// symbol: string;
}
