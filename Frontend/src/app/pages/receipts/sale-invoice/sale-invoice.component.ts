import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../../services/masters/masters.service';
import { CustomerService } from '../../../services/customer/customer.service';
import { IMyDpOptions } from 'mydatepicker';
import { SaleInvoiceService } from '../../../services/sale-invoice/sale-invoice.service';
import { BankMasterService } from '../../../services/bank-master/bank-master.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { $ } from 'protractor';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as jsPDF from 'jspdf';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

// import * as autoTable from 'jspdf-autotable';

import { NumberToWordsPipe } from '../sale-invoice/number-to-words.pipe';

@Component({
	selector: 'app-sale-invoice',
	templateUrl: './sale-invoice.component.html',
	styleUrls: [ './sale-invoice.component.scss' ]
})
export class SaleInvoiceComponent implements OnInit {
	saleDetailsForm: FormGroup;
	status: string = 'Pending';
	public myDatePickerOptions: IMyDpOptions = {
		// other options...
		dateFormat: 'dd.mm.yyyy'
	};

	setDate(): void {
		// Set today date using the patchValue function
		// let date = new Date();
		// this.myForm.patchValue({
		// 	myDate: {
		// 		date: {
		// 			year: date.getFullYear(),
		// 			month: date.getMonth() + 1,
		// 			day: date.getDate()
		// 		}
		// 	}
		// });
		// this.selectedInvoiceDate = null;
	}

	clearDate(): void {
		// Clear the date using the patchValue function
		//	this.myForm.patchValue({ myDate: null });
		this.selectedInvoiceDate = null;
	}

	searchedCustomers: any = [];
	selectedCustomer: any;
	selectedInvoiceDate: any;
	constructor(
		private mastersService: MastersService,
		private customerService: CustomerService,
		private bankMasterService: BankMasterService,
		private saleInvoiceService: SaleInvoiceService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private numberToWordsPipe: NumberToWordsPipe,
		private ngxLoader: NgxUiLoaderService,
		private toastrService: ToastrService
	) {}

	ngOnInit() {
		this.fetchProducts();
		this.fetchCompanyBanksList();
		this.saleDetailsForm = this.fb.group({
			invoice_no: [ '', [ Validators.required ] ],
			invoice_date: [ null ],
			eWayBillNumber: [ '' ],
			dispatch_through: [ '' ],
			vehicle_number: [ '' ],
			payment_mode: [ '' ],
			cash_payment_date: [ null ],
			neft_payment_date: [ null ],
			neft_transaction_number: [ '' ],
			company_bank_id: [ '' ],
			cheque_date: [ null ],
			cheque_number: [ '' ],
			upi_payment_date: [ null ],
			upi_transaction_id: [ '' ],
			customer_id: [ '' ],
			status: [ '1' ]
		});

		if (this.route.snapshot.paramMap.get('invoice_no') != null) {
			this.saleDetailsForm.controls['invoice_no'].setValue(atob(this.route.snapshot.paramMap.get('invoice_no')));
			// this.saleDetailsForm.controls['invoice_no'].setValue(atob(this.route.snapshot.paramMap.get('invoice_no'))); // get customer no from route
			this.getDetailsOfSaleInvoice();
			this.saveOrUpdate = 2;
		} else {
			this.saveOrUpdate = 1;
			this.getDetailsForSaleInvoice();
			this.saleDetailsForm.patchValue({
				invoice_date: {
					date: {
						year: new Date().getFullYear(),
						month: new Date().getMonth() + 1,
						day: new Date().getDate()
					}
				}
			});
		}
	}

	productData: any;
	fetchProducts() {
		this.ngxLoader.start();
		this.mastersService.fetchProductList().subscribe(
			(data) => {
				this.ngxLoader.stop();
				this.productData = data;
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
				this.ngxLoader.stop();
			}
		);
	}
	selectedProduct: any;
	selectedProductObj = <any>{};
	setItemValues() {
		this.selectedProductObj = this.productData.find((c) => c.product_id == this.selectedProduct);
		console.log(this.selectedProductObj);
		// console.log($("#stockedItems option[value='" + $('#input').val() + "']").attr('id'));
	}

	selectedProductList: any = [];
	addProductIntoCart() {
		this.selectedProductObj = this.productData.find((c) => c.product_id == this.selectedProduct);

		if (Object.keys(this.selectedProductObj).length === 0) {
			// this.mandatoryProductName=true;
		} else {
			let productObject = {
				product_id: this.selectedProductObj.product_id,
				product_name: this.selectedProductObj.product_name,
				hsn_or_sac_code: this.selectedProductObj.hsn_or_sac_code,
				quantity: 0,
				amount: 0,
				rate: 0,
				total: 0,
				ratePerUnit: '',
				quantityPerUnit: ''
			};

			this.selectedProductList.push(productObject);
			this.selectedProductObj = {};
			this.selectedProduct = '';
			// this.stockedProducts = [];
			console.log(this.selectedProductList);
		}
	}

	totalSellingCost: any = 0;
	totalQuantityUnit: string = '';
	totalQuantity: any = 0;
	roundOffValue: any = 0;
	totalRoundOffAmount: any = 0;

	updateProductCart(event, cell, rowIndex) {
		if (cell == 'ratePerUnit') {
			this.selectedProductList[rowIndex][cell] = event.target.value;
		} else if (cell == 'quantityPerUnit') {
			this.selectedProductList[rowIndex][cell] = event.target.value;
		} else {
			this.selectedProductList[rowIndex][cell] = event.target.value;
			// this.job_no + '_' + this.itemsAddedForMelting[rowIndex]['item_id'] + '_' + imageAM.name;

			let productTotal =
				this.selectedProductList[rowIndex]['quantity'] * this.selectedProductList[rowIndex]['rate'];
			this.selectedProductList[rowIndex]['total'] = productTotal.toFixed(2);
			this.selectedProductList = [ ...this.selectedProductList ];
			let totalAmount = this.selectedProductList.reduce(
				(sum, item) => parseFloat(sum) + parseFloat(item.total),
				0
			);
			this.totalSellingCost = totalAmount.toFixed(2);
			this.sgst_amount = (totalAmount * (parseFloat(this.sgst) / 100)).toFixed(2);
			this.cgst_amount = (totalAmount * (parseFloat(this.cgst) / 100)).toFixed(2);
			this.igst_amount = (totalAmount * (parseFloat(this.igst) / 100)).toFixed(2);
			this.roundOffValue = 0;
			this.totalTaxableSellingAmount = (totalAmount +
				(parseFloat(this.sgst_amount)) +
				(parseFloat(this.cgst_amount)) +
				(parseFloat(this.igst_amount))).toFixed(2);
			this.totalRoundOffAmount = (parseFloat(this.totalTaxableSellingAmount) +
				parseFloat(this.roundOffValue)).toFixed(2);
			this.totalQuantity = this.selectedProductList.reduce(
				(totalQuantity, item) => parseFloat(totalQuantity) + parseFloat(item.quantity),
				0
			);
		}
		console.log(this.totalSellingCost);
		console.log(this.selectedProductList);
	}

	removeProduct(index) {
		// this.totalAmount = parseFloat(this.totalAmount) - parseFloat(this.product_details[index].amount);
		// this.totalQuantity = parseFloat(this.totalQuantity) - parseFloat(this.product_details[index].quantity);
		this.roundOffValue = 0;
		this.selectedProductList.splice(index, 1);
		this.selectedProductList = [ ...this.selectedProductList ];
		this.totalQuantity = this.selectedProductList.reduce(
			(totalQuantity, item) => parseFloat(totalQuantity) + parseFloat(item.quantity),
			0
		);
		
		let totalCost=this.selectedProductList.reduce((sum, item) => parseFloat(sum) + parseFloat(item.total), 0);
		this.totalSellingCost = (totalCost).toFixed(2);
		this.sgst_amount = (this.totalSellingCost * (parseFloat(this.sgst) / 100)).toFixed(2);
		this.cgst_amount = (this.totalSellingCost * (parseFloat(this.cgst) / 100)).toFixed(2);
		this.igst_amount = (this.totalSellingCost * (parseFloat(this.igst) / 100)).toFixed(2);
		this.totalTaxableSellingAmount = (this.totalSellingCost +
			parseFloat(this.sgst_amount) +
			parseFloat(this.cgst_amount) +
			parseFloat(this.igst_amount)).toFixed(2);
		this.totalRoundOffAmount = (parseFloat(this.totalTaxableSellingAmount) +
			parseFloat(this.roundOffValue)).toFixed(2);
	} //end of method

	trackByFn(index: any, item: any) {
		// console.log(index);
		return index;
	}

	sgst: any = 0;
	sgst_amount: any = 0;
	cgst: any = 0;
	cgst_amount: any = 0;
	igst: any = 0;
	igst_amount: any = 0;
	totalTaxableSellingAmount: any = 0;
	calculateTaxableAmount(taxType) {
		if (taxType == 'sgst') {
			this.roundOffValue = 0;
			this.sgst_amount = (parseFloat(this.totalSellingCost) * (parseFloat(this.sgst) / 100)).toFixed(2);
			this.totalTaxableSellingAmount = (parseFloat(this.totalSellingCost) +
				parseFloat(this.sgst_amount) +
				parseFloat(this.cgst_amount) +
				parseFloat(this.igst_amount)).toFixed(2);
		}
		if (taxType == 'cgst') {
			this.roundOffValue = 0;
			this.cgst_amount = (parseFloat(this.totalSellingCost) * (parseFloat(this.cgst) / 100)).toFixed(2);
			this.totalTaxableSellingAmount = (parseFloat(this.totalSellingCost) +
				parseFloat(this.sgst_amount) +
				parseFloat(this.cgst_amount) +
				parseFloat(this.igst_amount)).toFixed(2);
		}
		if (taxType == 'igst') {
			this.roundOffValue = 0;
			this.igst_amount = (parseFloat(this.totalSellingCost) * (parseFloat(this.igst) / 100)).toFixed(2);
			this.totalTaxableSellingAmount = (parseFloat(this.totalSellingCost) +
				parseFloat(this.sgst_amount) +
				parseFloat(this.cgst_amount) +
				parseFloat(this.igst_amount)).toFixed(2);
		}

		this.totalRoundOffAmount = (parseFloat(this.totalTaxableSellingAmount) +
			parseFloat(this.roundOffValue)).toFixed(2);
	}

	searchCustomer(e) {
		var code = e.keyCode || e.which;

		// do nothing if it's an arrow key
		if (code == 37 || code == 38 || code == 39 || code == 40 || code == 13 || code == 9) {
			return;
		} else {
			var search_value = e.target.value;
			this.ngxLoader.start();
			this.customerService.searchCustomer(search_value).subscribe(
				(data) => {
					this.ngxLoader.stop();
					this.searchedCustomers = data;
				},
				(error) => {
					this.toastrService.error(error.error.message, 'Error!');
					this.ngxLoader.stop();
				}
			);
		}
	}

	selectedCustomerObj = <any>{};
	setCustomerDetails() {
		this.selectedCustomerObj = this.searchedCustomers.find(
			(c) => c.customer_id_name == this.saleDetailsForm.controls['customer_id'].value
		);
		console.log(this.selectedCustomerObj);
	}

	resetCustomerDetails() {
		this.searchedCustomers = [];
		this.selectedCustomer = '';
		this.selectedCustomerObj = {};
	}

	payment_mode: any = '';
	isCashPayment: boolean = false;
	isChequePayment: boolean = false;
	isUPIPayment: boolean = false;
	isNEFTPayment: boolean = false;

	onPaymentModeChange() {
		this.selectedBankObj = {};
		if (this.saleDetailsForm.controls['payment_mode'].value == 1) {
			this.isCashPayment = true;
			this.isChequePayment = false;
			this.isUPIPayment = false;
			this.isNEFTPayment = false;
			this.saleDetailsForm.controls['cheque_date'].setValue(null);
			this.saleDetailsForm.controls['cheque_number'].setValue('');
			this.saleDetailsForm.controls['upi_payment_date'].setValue(null);
			this.saleDetailsForm.controls['upi_transaction_id'].setValue('');
			this.saleDetailsForm.controls['neft_payment_date'].setValue(null);
			this.saleDetailsForm.controls['neft_transaction_number'].setValue('');
			this.saleDetailsForm.controls['company_bank_id'].setValue('');
		} else if (this.saleDetailsForm.controls['payment_mode'].value == 2) {
			this.isCashPayment = false;
			this.isChequePayment = true;
			this.isUPIPayment = false;
			this.isNEFTPayment = false;
			this.saleDetailsForm.controls['cash_payment_date'].setValue(null);
			this.saleDetailsForm.controls['upi_payment_date'].setValue(null);
			this.saleDetailsForm.controls['upi_transaction_id'].setValue('');
			this.saleDetailsForm.controls['neft_payment_date'].setValue(null);
			this.saleDetailsForm.controls['neft_transaction_number'].setValue('');
			this.saleDetailsForm.controls['company_bank_id'].setValue('');
		} else if (this.saleDetailsForm.controls['payment_mode'].value == 3) {
			this.isCashPayment = false;
			this.isChequePayment = false;
			this.isUPIPayment = false;
			this.isNEFTPayment = true;
			this.saleDetailsForm.controls['cash_payment_date'].setValue(null);
			this.saleDetailsForm.controls['cheque_date'].setValue(null);
			this.saleDetailsForm.controls['cheque_number'].setValue('');
			this.saleDetailsForm.controls['upi_payment_date'].setValue(null);
			this.saleDetailsForm.controls['upi_transaction_id'].setValue('');
		} else if (this.saleDetailsForm.controls['payment_mode'].value == 4) {
			this.isCashPayment = false;
			this.isChequePayment = false;
			this.isUPIPayment = true;
			this.isNEFTPayment = false;
			this.saleDetailsForm.controls['cheque_date'].setValue(null);
			this.saleDetailsForm.controls['cheque_number'].setValue('');
			this.saleDetailsForm.controls['cash_payment_date'].setValue(null);
			this.saleDetailsForm.controls['neft_payment_date'].setValue(null);
			this.saleDetailsForm.controls['neft_transaction_number'].setValue('');
			this.saleDetailsForm.controls['company_bank_id'].setValue('');
		}
	}

	selectedBankObj: any = {};
	onPaymentBankChange() {
		if (this.saleDetailsForm.controls['company_bank_id'].value != '') {
			this.selectedBankObj = this.companyBankDetails.find(
				(c) => c.bank_id == this.saleDetailsForm.controls['company_bank_id'].value
			);
		}
	}

	payment_bank: any = '';
	companyBankDetails: any = [];
	fetchCompanyBanksList() {
		this.ngxLoader.start();
		this.bankMasterService.fetchCompanyBankList().subscribe(
			(data) => {
				this.ngxLoader.stop();
				this.companyBankDetails = data;
				//	this.ds = data;
				// this.dataSource = new MatTableDataSource<PeriodicElement>(this.ds);
				// this.length = this.ds.length;
				// this.dataSource.paginator = this.paginator;
				// this.ngxLoader.stop();
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
				this.ngxLoader.stop();
			}
		);
	}
	invoice: any = [
		{ sr_no: '', hsn_or_sac_code: '', product_name: '', quantity: '', rate: '', amount: '' },
		{ sr_no: '', hsn_or_sac_code: '', product_name: '', quantity: '', rate: '', amount: '' },
		{ sr_no: '', hsn_or_sac_code: '', product_name: '', quantity: '', rate: '', amount: '' },
		{ sr_no: '', hsn_or_sac_code: '', product_name: '', quantity: '', rate: '', amount: '' },
		{ sr_no: '', hsn_or_sac_code: '', product_name: '', quantity: '', rate: '', amount: '' },
		{ sr_no: '', hsn_or_sac_code: '', product_name: '', quantity: '', rate: '', amount: '' },
		{ sr_no: '', hsn_or_sac_code: '', product_name: '', quantity: '', rate: '', amount: '' },
		{ sr_no: '', hsn_or_sac_code: '', product_name: '', quantity: '', rate: '', amount: '' },
		{ sr_no: '', hsn_or_sac_code: '', product_name: '', quantity: '', rate: '', amount: '' },
		{ sr_no: '1', hsn_or_sac_code: '123', product_name: 'W Mix', quantity: '210', rate: '20', amount: '2540' }
	];

	saveOrUpdate: any;
	submitSaleInvoice() {
		let iDate = this.saleDetailsForm.controls['invoice_date'].value;
		let customer_id = this.saleDetailsForm.controls['customer_id'].value.split('-');
		let invoice_id = this.saleDetailsForm.controls['invoice_no'].value.split('/');
		let sellingDetails = {
			saveOrUpdate: this.saveOrUpdate,
			product_details: this.selectedProductList,
			roundOff: this.roundOffValue == undefined ? 0 : this.roundOffValue,
			finalAmount: this.totalRoundOffAmount == undefined ? 0 : this.totalRoundOffAmount,
			grand_total: this.totalTaxableSellingAmount == undefined ? 0 : this.totalTaxableSellingAmount,
			total_amount_excluding_tax: this.totalSellingCost == undefined ? 0 : this.totalSellingCost,
			total_quantity: this.totalQuantity == undefined ? 0 : this.totalQuantity,
			total_quantity_unit: this.totalQuantityUnit,
			cgst_rate: this.cgst,
			cgst_amount: this.cgst_amount,
			sgst_rate: this.sgst,
			sgst_amount: this.sgst_amount,
			igst_rate: this.igst,
			igst_amount: this.igst_amount,
			status: this.saleDetailsForm.controls['status'].value,
			invoice_no: this.saleDetailsForm.controls['invoice_no'].value,
			invoice_id: parseInt(invoice_id[1]),
			invoice_date:
				this.saleDetailsForm.controls['invoice_date'].value != null
					? this.getYYYYMMDDFormat(this.saleDetailsForm.controls['invoice_date'].value)
					: this.saleDetailsForm.controls['invoice_date'].value,
			eWayBillNumber: this.saleDetailsForm.controls['eWayBillNumber'].value,
			dispatch_through: this.saleDetailsForm.controls['dispatch_through'].value,
			vehicle_number: this.saleDetailsForm.controls['vehicle_number'].value,
			payment_mode: this.saleDetailsForm.controls['payment_mode'].value,
			cash_payment_date:
				this.saleDetailsForm.controls['cash_payment_date'].value != null
					? this.getYYYYMMDDFormat(this.saleDetailsForm.controls['cash_payment_date'].value)
					: this.saleDetailsForm.controls['cash_payment_date'].value,
			neft_payment_date:
				this.saleDetailsForm.controls['neft_payment_date'].value != null
					? this.getYYYYMMDDFormat(this.saleDetailsForm.controls['neft_payment_date'].value)
					: this.saleDetailsForm.controls['neft_payment_date'].value,
			neft_transaction_number: this.saleDetailsForm.controls['neft_transaction_number'].value,
			company_bank_id: this.saleDetailsForm.controls['company_bank_id'].value,
			cheque_date:
				this.saleDetailsForm.controls['cheque_date'].value != null
					? this.getYYYYMMDDFormat(this.saleDetailsForm.controls['cheque_date'].value)
					: this.saleDetailsForm.controls['cheque_date'].value,
			cheque_number: this.saleDetailsForm.controls['cheque_number'].value,
			upi_payment_date:
				this.saleDetailsForm.controls['upi_payment_date'].value != null
					? this.getYYYYMMDDFormat(this.saleDetailsForm.controls['upi_payment_date'].value)
					: this.saleDetailsForm.controls['upi_payment_date'].value,
			upi_transaction_id: this.saleDetailsForm.controls['upi_transaction_id'].value,
			customer_id: parseInt(customer_id[0]),
			company_id: atob(localStorage.getItem('companyId')),
			record_updated_by: atob(localStorage.getItem('userId')),
			record_updated_date: new Date().toISOString().split('T')[0]
		};
		this.ngxLoader.start();
		this.saleInvoiceService.saveSaleInvoiceDetails(sellingDetails).subscribe(
			(data) => {
				this.ngxLoader.stop();
				this.toastrService.success(data['success'], 'Success...!');
				this.router.navigate([ '/receipts/sale_invoice_listing' ]);
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
			}
		);
	}

	getYYYYMMDDFormat(dateJson) {
		return "'" + dateJson.date.year + '-' + dateJson.date.month + '-' + dateJson.date.day + "'";
	}

	getDetailsForSaleInvoice() {
		this.ngxLoader.start();
		this.saleInvoiceService.getDetailsForSaleInvoice().subscribe(
			(data) => {
				this.ngxLoader.stop();
				this.companyDetails = data[0][0];
				console.log(data[1][0].max_invoice_id);
				if (data[1][0].max_invoice_id == null) {
					this.saleDetailsForm.controls['invoice_no'].setValue(new Date().getFullYear() + '/1');
				} else {
					let latestInvoiceNo = new Date().getFullYear() + '/' + (data[1][0].max_invoice_id + 1);
					this.saleDetailsForm.controls['invoice_no'].setValue(latestInvoiceNo);
				}
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
			}
		);
	}
	companyDetails: any = {};

	getDetailsOfSaleInvoice() {
		this.ngxLoader.start();
		this.saleInvoiceService.getDetailsOfSaleInvoice(this.saleDetailsForm.controls['invoice_no'].value).subscribe(
			(data) => {
				this.ngxLoader.stop();
				this.saleDetailsForm.controls['status'].setValue(data[0][0].status);
				this.saleDetailsForm.controls['eWayBillNumber'].setValue(data[0][0].eWayBillNumber);
				this.saleDetailsForm.controls['dispatch_through'].setValue(data[0][0].dispatch_through);
				this.saleDetailsForm.controls['vehicle_number'].setValue(data[0][0].vehicle_number);
				this.saleDetailsForm.controls['payment_mode'].setValue(data[0][0].payment_mode);
				this.onPaymentModeChange();
				this.saleDetailsForm.controls['company_bank_id'].setValue(data[0][0].company_bank_id);
				this.onPaymentBankChange();
				this.saleDetailsForm.controls['cheque_number'].setValue(data[0][0].cheque_number);
				this.saleDetailsForm.controls['upi_transaction_id'].setValue(data[0][0].upi_transaction_id);
				this.saleDetailsForm.controls['customer_id'].setValue(data[0][0].customer_id_name);
				this.saleDetailsForm.controls['neft_transaction_number'].setValue(data[0][0].neft_transaction_number);

				let invoice_date =
					data[0][0].invoice_date == null ? null : this.formatBackendReturnedDate(data[0][0].invoice_date);
				this.saleDetailsForm.controls['invoice_date'].setValue(invoice_date);

				let neft_payment_date =
					data[0][0].neft_payment_date == null
						? null
						: this.formatBackendReturnedDate(data[0][0].neft_payment_date);
				this.saleDetailsForm.controls['neft_payment_date'].setValue(neft_payment_date);

				let cash_payment_date =
					data[0][0].cash_payment_date == null
						? null
						: this.formatBackendReturnedDate(data[0][0].cash_payment_date);
				this.saleDetailsForm.controls['cash_payment_date'].setValue(cash_payment_date);

				let cheque_date =
					data[0][0].cheque_date == null ? null : this.formatBackendReturnedDate(data[0][0].cheque_date);
				this.saleDetailsForm.controls['cheque_date'].setValue(cheque_date);

				let upi_payment_date =
					data[0][0].upi_payment_date == null
						? null
						: this.formatBackendReturnedDate(data[0][0].upi_payment_date);
				this.saleDetailsForm.controls['upi_payment_date'].setValue(upi_payment_date);
				this.totalQuantity = data[0][0].total_quantity;
				this.totalQuantityUnit = data[0][0].total_quantity_unit;
				this.totalTaxableSellingAmount = data[0][0].grand_total;
				this.roundOffValue = data[0][0].roundOff;
				this.totalRoundOffAmount = data[0][0].finalAmount;
				this.totalSellingCost = data[0][0].total_amount_excluding_tax;
				this.igst = data[0][0].igst_rate;
				this.igst_amount = data[0][0].igst_amount;
				this.cgst = data[0][0].cgst_rate;
				this.cgst_amount = data[0][0].cgst_amount;
				this.sgst = data[0][0].sgst_rate;
				this.sgst_amount = data[0][0].sgst_amount;

				this.selectedProductList = data[1];
				this.companyDetails = data[2][0];

				this.selectedCustomerObj.customer_pan_no = data[0][0].customer_pan_no;
				this.selectedCustomerObj.customer_gst_no = data[0][0].customer_gst_no;
				this.selectedCustomerObj.customer_id = data[0][0].customer_id;
				this.selectedCustomerObj.customer_name = data[0][0].customer_name;
				this.selectedCustomerObj.customer_address = data[0][0].customer_address;
				this.selectedCustomerObj.customer_tahsil = data[0][0].customer_tahsil;
				this.selectedCustomerObj.customer_district = data[0][0].customer_district;
				this.selectedCustomerObj.customer_pin_code = data[0][0].customer_pin_code;
				this.selectedCustomerObj.customer_mobile_no = data[0][0].customer_mobile_no;
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
			}
		);
	}

	formatBackendReturnedDate(dt) {
		let newDate = new Date(dt);
		return {
			date: {
				year: newDate.getFullYear(),
				month: newDate.getMonth() + 1,
				day: newDate.getDate()
			}
		};
	}

	exportInvoice(operation) {
		const doc = new jsPDF();
		doc.setFont('Calibri');
		doc.setFontSize(12);
		doc.text('TAX INVOICE', 105, 10, 'center');
		doc.setFontSize(15);
		doc.setFontType('bold');
		doc.text('' + this.companyDetails.company_name, 105, 20, 'center');
		doc.setFontSize(12);
		doc.setFontType('normal');
		doc.text(
			'' +
				this.companyDetails.street_address +
				',' +
				this.companyDetails.city_name +
				' At / Post / Tal - ' +
				this.companyDetails.tahsil_name +
				', Dist - ' +
				this.companyDetails.district_name +
				' - ' +
				this.companyDetails.pin_code,
			105,
			25,
			'center'
		);
		doc.text('Email : ' + this.companyDetails.company_email, 105, 30, 'center');
		doc.text('Mob. No. : ' + this.companyDetails.mobile_number, 105, 35, 'center');
		doc.setDrawColor(0);
		doc.setLineWidth(0.5);
		doc.setFillColor(255, 255, 255);
		doc.rect(25, 42, 165, 252, 'FD'); //Fill and Border
		doc.line(25, 50, 190, 50);
		doc.line(110, 58, 190, 58);
		doc.line(110, 66, 190, 66);
		doc.line(110, 74, 190, 74);
		doc.line(110, 82, 190, 82);
		doc.line(25, 90, 190, 90);
		doc.line(25, 98, 190, 98);
		doc.line(25, 106, 190, 106);
		doc.line(110, 42, 110, 222);
		doc.setFontStyle('bold');
		doc.text('Company GSTIN : ', 27, 47);
		doc.text('' + this.companyDetails.company_gst_no, 65, 47);
		doc.text('Company PAN : ', 111, 47);
		doc.text('' + this.companyDetails.company_pan_no, 143, 47);
		doc.text('Invoice No. : ', 111, 55);
		doc.text('' + this.saleDetailsForm.controls['invoice_no'].value, 188, 55, 'right');
		let invoice_date;
		if (this.saleDetailsForm.controls['invoice_date'].value != null) {
			let beforeFormatDate = this.saleDetailsForm.controls['invoice_date'].value;
			invoice_date =
				beforeFormatDate.date.day + '/' + beforeFormatDate.date.month + '/' + beforeFormatDate.date.year;
		} else {
			invoice_date = '';
		}

		let customer_gst =
			this.selectedCustomerObj.customer_gst_no == undefined || this.selectedCustomerObj.customer_gst_no == null
				? ''
				: this.selectedCustomerObj.customer_gst_no;
		let customer_name =
			this.selectedCustomerObj.customer_name == undefined || this.selectedCustomerObj.customer_name == null
				? ''
				: this.selectedCustomerObj.customer_name;
		let customer_address =
			this.selectedCustomerObj.customer_address == undefined || this.selectedCustomerObj.customer_address == null
				? ''
				: this.selectedCustomerObj.customer_address;
		let customer_tahsil =
			this.selectedCustomerObj.customer_tahsil == undefined || this.selectedCustomerObj.customer_tahsil == null
				? ''
				: this.selectedCustomerObj.customer_tahsil;
		let customer_district =
			this.selectedCustomerObj.customer_district == undefined ||
			this.selectedCustomerObj.customer_district == null
				? ''
				: this.selectedCustomerObj.customer_district;
		let customer_pin_code =
			this.selectedCustomerObj.customer_pin_code == undefined ||
			this.selectedCustomerObj.customer_pin_code == null
				? ''
				: this.selectedCustomerObj.customer_pin_code;
		let customer_mobile_no =
			this.selectedCustomerObj.customer_mobile_no == undefined ||
			this.selectedCustomerObj.customer_mobile_no == null
				? ''
				: this.selectedCustomerObj.customer_mobile_no;

		var splittedCustomerName = doc.splitTextToSize(customer_name, 90);
		console.log(splittedCustomerName);
		//doc.text(15, 20, splitTitle);
		doc.text('Invoice Date. : ', 111, 63);
		doc.text('' + invoice_date, 188, 63, 'right');
		doc.text('E-Way Bill No. : ', 111, 71);
		doc.text('' + this.saleDetailsForm.controls['eWayBillNumber'].value, 188, 71, 'right');
		doc.text('Dispatch Through : ', 111, 79);
		doc.text('' + this.saleDetailsForm.controls['dispatch_through'].value, 188, 79, 'right');
		doc.text('Vehicle No. : ', 111, 87);
		doc.text('' + this.saleDetailsForm.controls['vehicle_number'].value, 188, 87, 'right');
		doc.text('Delivery Note : ', 111, 95);
		doc.text('', 188, 95, 'right');
		doc.text('Customer GSTIN : ', 27, 95);
		doc.text('' + customer_gst, 65, 95);
		doc.setFontStyle('normal');
		doc.text('To , ', 27, 55);
		doc.setFontStyle('bold');
		let customerDetailsTop = 61;
		for (let i = 0; i < splittedCustomerName.length; i++) {
			doc.text('' + splittedCustomerName[i], 27, customerDetailsTop);
			customerDetailsTop = customerDetailsTop + 6;
		}

		doc.setFontStyle('normal');
		doc.setFontSize(11);
		var splittedCustomerAddress = doc.splitTextToSize(customer_address, 82);
		for (let i = 0; i < splittedCustomerAddress.length; i++) {
			doc.text('' + splittedCustomerAddress[i], 27, customerDetailsTop);
			customerDetailsTop = customerDetailsTop + 5;
		}
		let formattedTahsil = customer_tahsil == '' ? '' : 'Tal. ' + customer_tahsil + ' ';
		doc.text(formattedTahsil + 'Dist-' + customer_district + ' ' + customer_pin_code, 27, customerDetailsTop);
		doc.text('Mob.No.' + customer_mobile_no, 27, customerDetailsTop + 5);
		doc.line(37, 98, 36, 187);
		doc.line(60, 98, 60, 222);
		doc.line(131, 98, 131, 222);
		doc.line(153, 98, 153, 187);
		doc.line(166, 98, 166, 229);
		doc.setFontSize(11);
		doc.setFontStyle('bold');
		doc.text('Sr.No.', 26, 103);
		doc.text('HSN/SAC', 39, 103);
		doc.text('Particulars', 62, 103);
		doc.text('Quantity', 111, 103);
		doc.text('Rate', 133, 103);
		doc.text('Per', 155, 103);
		doc.text('Amount', 168, 103);
		var top = 117;

		var srNo = 1;
		for (let i = 0; i < this.selectedProductList.length; i++) {
			doc.text('' + srNo, 35, top, 'right');
			doc.text('' + this.selectedProductList[i].hsn_or_sac_code, 58, top, 'right');

			var splittedProductName = doc.splitTextToSize(this.selectedProductList[i].product_name, 45);
			var productNameTop = top;
			for (let i = 0; i < splittedProductName.length; i++) {
				doc.text('' + splittedProductName[i], 62, productNameTop, 'left');
				productNameTop += 5;
			}
			doc.text(
				'' + this.selectedProductList[i].quantity + ' ' + this.selectedProductList[i].quantityPerUnit,
				129,
				top,
				'right'
			);
			doc.text('' + this.selectedProductList[i].rate, 151, top, 'right');
			doc.text('' + this.selectedProductList[i].ratePerUnit, 164, top, 'right');
			doc.text('' + this.selectedProductList[i].total, 188, top, 'right');
			top += 15;
			srNo += 1;
		}
		doc.line(25, 187, 190, 187);
		doc.line(25, 194, 190, 194);
		doc.line(60, 201, 190, 201);
		doc.line(60, 208, 190, 208);
		doc.line(60, 215, 190, 215);
		doc.line(25, 222, 190, 222);
		doc.line(25, 229, 190, 229);
		doc.line(25, 241, 190, 241);
		doc.line(25, 257, 190, 257);

		doc.text('Total', 100, 192);
		doc.text(this.totalQuantity + ' ' + this.totalQuantityUnit, 129, 192, 'right');
		doc.text('' + this.totalSellingCost, 188, 192, 'right');
		doc.text('Output CGST ' + this.cgst + '%', 62, 199, 'left');
		doc.text('' + this.cgst_amount, 188, 199, 'right');
		doc.text('Output SGST ' + this.sgst + '%', 62, 206, 'left');
		doc.text('' + this.sgst_amount, 188, 206, 'right');
		doc.text('Output IGST', 62, 213, 'left');
		doc.text('Round Off', 62, 220, 'left');
		doc.text('Grand Total', 140, 227);
		doc.text('' + this.roundOffValue, 188, 220, 'right');
		doc.text('' + this.totalRoundOffAmount, 188, 227, 'right');
		doc.setFontStyle('normal');
		doc.text('Amount in words :', 26, 234);
		doc.setFontStyle('bold');
		doc.text('' + this.numberToWordsPipe.transform(this.totalRoundOffAmount), 26, 239);
		doc.text('Declaration :', 26, 245);
		doc.setFontStyle('normal');
		doc.text('We declare that this invoice shows the actual price of the goods described and', 26, 250);
		doc.text('that all particulars are true and correct.', 26, 255);

		doc.setFontStyle('bold');
		console.log(this.selectedBankObj);
		if (Object.keys(this.selectedBankObj).length !== 0) {
			var splittedBankname = doc.splitTextToSize(this.selectedBankObj.bank_name, 65);
			console.log(splittedBankname);
			doc.line(110, 257, 110, 294);
			doc.text('Bank Details', 26, 261);
			doc.line(25, 263, 110, 263);
			doc.text('Bank Name :', 26, 268);
			var bankDetailsTop = 268;
			for (let i = 0; i < splittedBankname.length; i++) {
				doc.text('' + splittedBankname[i], 52, bankDetailsTop);
				bankDetailsTop += 6;
			}
			doc.text('Account No. :', 26, bankDetailsTop);
			doc.text('' + this.selectedBankObj.account_number, 52, bankDetailsTop);
			doc.text('Branch Name :', 26, bankDetailsTop + 6);
			doc.text('' + this.selectedBankObj.branch_name, 52, bankDetailsTop + 6);
			doc.text('IFSC Code :', 26, bankDetailsTop + 12);
			doc.text('' + this.selectedBankObj.ifsc_code, 52, bankDetailsTop + 12);
		}
		doc.text('For ' + this.companyDetails.company_name, 150, 273, 'center');
		doc.setFontStyle('normal');
		doc.text('Authorised Signatory', 150, 290, 'center');

		//08013100
		if (operation == 'open') {
			var string = doc.output('datauristring');
			var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
			var x = window.open();
			x.document.open();
			x.document.write(iframe);
			x.document.close();
		}

		if (operation == 'download') {
			doc.save('tax-invoice-' + this.saleDetailsForm.controls['invoice_no'].value + '.pdf');
		}
		//doc.autoPrint();
	}
}
