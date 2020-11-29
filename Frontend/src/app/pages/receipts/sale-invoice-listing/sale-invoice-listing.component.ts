import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SaleInvoiceService } from '../../../services/sale-invoice/sale-invoice.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IMyDpOptions } from 'mydatepicker';

@Component({
	selector: 'app-sale-invoice-listing',
	templateUrl: './sale-invoice-listing.component.html',
	styleUrls: [ './sale-invoice-listing.component.css' ]
})
export class SaleInvoiceListingComponent implements OnInit {
	displayedColumns: string[] = [ 'ID', 'Invoice No.', 'Invoice Date', 'Customer Name', 'Status', 'Action' ];
	status: string[] = [
		'',
		'Pending',
		'Payment Done & Delivery InProgress',
		'Payment Pending & Product Delivered',
		'Payment Pending & Delivery InProgress',
		'Completed'
	];
	length: any;
	pageSize: any = 5;
	ds: any = [];
	dateFormat = 'yyyy/MM/dd';
	public myDatePickerOptions: IMyDpOptions = {
		// other options...
		dateFormat: 'dd.mm.yyyy'
	};
	dataSource = new MatTableDataSource<PeriodicElement>();

	@ViewChild(MatPaginator, { static: true })
	paginator: MatPaginator;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public toastrService: ToastrService,
		private ngxLoader: NgxUiLoaderService,
		private saleInvoiceService: SaleInvoiceService,
		private http: HttpClient
	) {}

	ngOnInit() {
		this.ngxLoader.start();
		this.fetchSaleInvoicesList();
		const getRandomNameList = (name: string) =>
			this.http.get(`${this.randomUserUrl}`).pipe(map((res: any) => res.results)).pipe(
				map((list: any) => {
					return list.map((item: any) => `${item.name.first} ${name}`);
				})
			);
		const optionList$: Observable<string[]> = this.searchChange$
			.asObservable()
			.pipe(debounceTime(500))
			.pipe(switchMap(getRandomNameList));
		optionList$.subscribe((data) => {
			this.optionList = data;
			this.isLoading = false;
		});
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

	randomUserUrl = 'https://api.randomuser.me/?results=5';
	searchChange$ = new BehaviorSubject('');
	optionList: string[] = [];
	selectedUser?: string;
	isLoading = false;

	onSearch(value: string): void {
		this.isLoading = true;
		this.searchChange$.next(value);
	}

	allChecked = false;
	indeterminate = true;
	checkOptionsOne = [
		{ label: 'Apple', value: 'Apple', checked: true },
		{ label: 'Pear', value: 'Pear', checked: false },
		{ label: 'Orange', value: 'Orange', checked: false }
	];

	updateAllChecked(): void {
		this.indeterminate = false;
		if (this.allChecked) {
			this.checkOptionsOne = this.checkOptionsOne.map((item) => {
				return {
					...item,
					checked: true
				};
			});
		} else {
			this.checkOptionsOne = this.checkOptionsOne.map((item) => {
				return {
					...item,
					checked: false
				};
			});
		}
	}

	updateSingleChecked(): void {
		if (this.checkOptionsOne.every((item) => !item.checked)) {
			this.allChecked = false;
			this.indeterminate = false;
		} else if (this.checkOptionsOne.every((item) => item.checked)) {
			this.allChecked = true;
			this.indeterminate = false;
		} else {
			this.indeterminate = true;
		}
	}

	public daterange: any = {};

	public options: any = {
		locale: { format: 'YYYY-MM-DD' },
		alwaysShowCalendars: false
	};

	public selectedDate(value: any, datepicker?: any) {
		// this is the date  selected
		console.log(value);

		// any object can be passed to the selected event and it will be passed back here
		datepicker.start = value.start;
		datepicker.end = value.end;

		// use passed valuable to update state
		this.daterange.start = value.start;
		this.daterange.end = value.end;
		this.daterange.label = value.label;
	}
}

export interface PeriodicElement {}

const ELEMENT_DATA: PeriodicElement[] = [];
