import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BankMasterService } from '../../../services/bank-master/bank-master.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
	selector: 'app-bank-master',
	templateUrl: './bank-master.component.html',
	styleUrls: [ './bank-master.component.scss' ]
})
export class BankMasterComponent implements OnInit {
	companyBankDetailsForms: FormGroup;
	@ViewChild('primaryModal') public primaryModal: ModalDirective;

	bank_id: any;

	displayedColumns: string[] = [ 'ID', 'Name', 'Branch', 'Account Holder', 'Action' ];
	length: any;
	ds: any = [];
	dataSource = new MatTableDataSource<PeriodicElement>();

	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;

	constructor(
		public toastrService: ToastrService,
		private ngxLoader: NgxUiLoaderService,
		private bankMasterService: BankMasterService,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.companyBankDetailsForms = this.fb.group({
			bank_name: [ '' ],
			branch_name: [ '' ],
			branch_address: [ '' ],
			account_holder_name: [ '' ],
			account_number: [ '' ],
			ifsc_code: [ '' ]
		});
		this.ngxLoader.start();
		this.bankMasterService.fetchCompanyBankList().subscribe(
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

	resetCompanyBankDetails() {
		this.companyBankDetailsForms.controls['bank_name'].setValue('');
		this.companyBankDetailsForms.controls['branch_name'].setValue('');
		this.companyBankDetailsForms.controls['branch_address'].setValue('');
		this.companyBankDetailsForms.controls['account_holder_name'].setValue('');
		this.companyBankDetailsForms.controls['account_number'].setValue('');
		this.companyBankDetailsForms.controls['ifsc_code'].setValue('');
		this.bank_id = undefined;
	}

	editCompanyBank(bank_id) {
		var bank_details;
		this.ds.map(function(e) {
			if (e.bank_id == bank_id) {
				bank_details = e;
				//	return details;
			}
		});
		this.bank_id = bank_details.bank_id;
		this.companyBankDetailsForms.controls['bank_name'].setValue(bank_details.bank_name);
		this.companyBankDetailsForms.controls['branch_name'].setValue(bank_details.branch_name);
		this.companyBankDetailsForms.controls['branch_address'].setValue(bank_details.branch_address);
		this.companyBankDetailsForms.controls['account_holder_name'].setValue(bank_details.account_holder_name);
		this.companyBankDetailsForms.controls['account_number'].setValue(bank_details.account_number);
		this.companyBankDetailsForms.controls['ifsc_code'].setValue(bank_details.ifsc_code);
		this.primaryModal.show();
	}

	addCompanyBank() {
		this.resetCompanyBankDetails();
		this.primaryModal.show();
	}

	submit_bank_details() {
		this.ngxLoader.start();

		let bankDetailsToSubmit = {
			company_id: atob(localStorage.getItem('companyId')),
			bank_id: this.bank_id,
			bank_name: this.companyBankDetailsForms.controls['bank_name'].value,
			branch_name: this.companyBankDetailsForms.controls['branch_name'].value,
			branch_address: this.companyBankDetailsForms.controls['branch_address'].value,
			account_holder_name: this.companyBankDetailsForms.controls['account_holder_name'].value,
			account_number: this.companyBankDetailsForms.controls['account_number'].value,
			ifsc_code: this.companyBankDetailsForms.controls['ifsc_code'].value,
			record_updated_by: atob(localStorage.getItem('userId')),
			record_updated_date: new Date().toISOString().split('T')[0]
		};

		console.log(bankDetailsToSubmit);

		this.bankMasterService.saveOrUpdateCompanyBankDetails(bankDetailsToSubmit).subscribe(
			(data) => {
				this.toastrService.success(data['success'], 'Success!');
				this.fetchCompanyBanksList();
				this.resetCompanyBankDetails();
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

	fetchCompanyBanksList() {
		this.bankMasterService.fetchCompanyBankList().subscribe(
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
	bank_name: string;
	// position: number;
	// weight: number;
	// symbol: string;
}
