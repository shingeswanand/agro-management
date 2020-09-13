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
// import * as autoTable from 'jspdf-autotable';

import { NumberToWordsPipe } from '../sale-invoice/number-to-words.pipe';

@Component({
	selector: 'app-sale-invoice',
	templateUrl: './sale-invoice.component.html',
	styleUrls: [ './sale-invoice.component.scss' ]
})
export class SaleInvoiceComponent implements OnInit {
	saleDetailsForm: FormGroup;
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
		alert(this.selectedInvoiceDate);
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
		private numberToWordsPipe: NumberToWordsPipe
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
			customer_id: [ '' ]
		});

		if (this.route.snapshot.paramMap.get('invoice_no') != null) {
			alert(atob(this.route.snapshot.paramMap.get('invoice_no')));
			this.saleDetailsForm.controls['invoice_no'].setValue(atob(this.route.snapshot.paramMap.get('invoice_no')));
			// this.saleDetailsForm.controls['invoice_no'].setValue(atob(this.route.snapshot.paramMap.get('invoice_no'))); // get customer no from route
			this.getDetailsOfSaleInvoice();
		} else {
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
		this.mastersService.fetchProductList().subscribe(
			(data) => {
				this.productData = data;
			},
			(error) => {}
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

	totalSellingCost: any;
	totalQuantityUnit: string = '';
	totalQuantity: any;
	updateProductCart(event, cell, rowIndex) {
		if (cell == 'ratePerUnit') {
			this.selectedProductList[rowIndex][cell] = event.target.value;
		} else if (cell == 'quantityPerUnit') {
			this.selectedProductList[rowIndex][cell] = event.target.value;
		} else {
			this.selectedProductList[rowIndex][cell] = event.target.value;
			// this.job_no + '_' + this.itemsAddedForMelting[rowIndex]['item_id'] + '_' + imageAM.name;
			this.selectedProductList[rowIndex]['total'] =
				this.selectedProductList[rowIndex]['quantity'] * this.selectedProductList[rowIndex]['rate'];
			this.selectedProductList = [ ...this.selectedProductList ];
			this.totalSellingCost = this.selectedProductList.reduce((sum, item) => sum + item.total, 0);
			this.sgst_amount = this.totalSellingCost * (this.sgst / 100);
			this.cgst_amount = this.totalSellingCost * (this.cgst / 100);
			this.igst_amount = this.totalSellingCost * (this.igst / 100);
			this.totalTaxableSellingAmount =
				this.totalSellingCost + this.sgst_amount + this.cgst_amount + this.igst_amount;
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

		this.selectedProductList.splice(index, 1);
		this.selectedProductList = [ ...this.selectedProductList ];
		this.totalQuantity = this.selectedProductList.reduce(
			(totalQuantity, item) => parseFloat(totalQuantity) + parseFloat(item.quantity),
			0
		);
		this.totalSellingCost = this.selectedProductList.reduce((sum, item) => sum + item.total, 0);
		this.sgst_amount = this.totalSellingCost * (this.sgst / 100);
		this.cgst_amount = this.totalSellingCost * (this.cgst / 100);
		this.igst_amount = this.totalSellingCost * (this.igst / 100);
		this.totalTaxableSellingAmount = this.totalSellingCost + this.sgst_amount + this.cgst_amount + this.igst_amount;
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
	totalTaxableSellingAmount: any;
	calculateTaxableAmount(taxType) {
		if (taxType == 'sgst') {
			this.sgst_amount = this.totalSellingCost * (this.sgst / 100);
			this.totalTaxableSellingAmount =
				this.totalSellingCost + this.sgst_amount + this.cgst_amount + this.igst_amount;
		}
		if (taxType == 'cgst') {
			this.cgst_amount = this.totalSellingCost * (this.cgst / 100);
			this.totalTaxableSellingAmount =
				this.totalSellingCost + this.sgst_amount + this.cgst_amount + this.igst_amount;
		}
		if (taxType == 'igst') {
			this.igst_amount = this.totalSellingCost * (this.igst / 100);
			this.totalTaxableSellingAmount =
				this.totalSellingCost + this.sgst_amount + this.cgst_amount + this.igst_amount;
		}
	}

	searchCustomer(e) {
		var code = e.keyCode || e.which;

		// do nothing if it's an arrow key
		if (code == 37 || code == 38 || code == 39 || code == 40 || code == 13 || code == 9) {
			return;
		} else {
			var search_value = e.target.value;
			this.customerService.searchCustomer(search_value).subscribe(
				(data) => {
					this.searchedCustomers = data;
				},
				(error) => {}
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
		this.selectedBankObj = this.companyBankDetails.find(
			(c) => c.bank_id == this.saleDetailsForm.controls['company_bank_id'].value
		);
		alert(this.selectedBankObj);
	}

	payment_bank: any = '';
	companyBankDetails: any = [];
	fetchCompanyBanksList() {
		this.bankMasterService.fetchCompanyBankList().subscribe(
			(data) => {
				this.companyBankDetails = data;
				//	this.ds = data;
				// this.dataSource = new MatTableDataSource<PeriodicElement>(this.ds);
				// this.length = this.ds.length;
				// this.dataSource.paginator = this.paginator;
				// this.ngxLoader.stop();
			},
			(error) => {
				//	this.toastrService.error(error.error.message, 'Error!');
				// this.ngxLoader.stop();
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
	showInvoiceDetails() {
		var bodyData = [];

		var dataHead = [];
		dataHead.push({ text: 'Sr. No.', style: 'tableHeader', bold: true, fontSize: 9, alignment: 'center' });
		dataHead.push({ text: 'HSN/SAC', style: 'tableHeader', bold: true, fontSize: 9, alignment: 'center' });
		dataHead.push({ text: 'Particulars', style: 'tableHeader', bold: true, fontSize: 9, alignment: 'center' });
		dataHead.push({ text: 'Quantity', style: 'tableHeader', bold: true, fontSize: 9, alignment: 'center' });
		dataHead.push({ text: 'Rate', style: 'tableHeader', bold: true, fontSize: 9, alignment: 'center' });
		dataHead.push({ text: 'Rate Per', style: 'tableHeader', bold: true, fontSize: 9, alignment: 'center' });
		dataHead.push({ text: 'Amount', style: 'tableHeader', bold: true, fontSize: 9, alignment: 'center' });

		bodyData.push(dataHead);

		for (var i = 0; i < this.selectedProductList.length; i++) {
			var dataRow = [];

			// var process_test_name: any = this.selectedProductList[i].process_test_name;
			// var product_quantity: any = this.selectedProductList[i].product_quantity;
			// var total_amount_for_process: any = this.selectedProductList[i].total_amount_for_process;

			dataRow.push({ text: '' + i, style: 'tableHeader', fontSize: 9, alignment: 'left' });
			dataRow.push({ text: 'hsn', style: 'tableHeader', fontSize: 9, alignment: 'center' });
			dataRow.push({ text: 'hsn', style: 'tableHeader', fontSize: 9, alignment: 'center' });
			dataRow.push({ text: 'hsn', style: 'tableHeader', fontSize: 9, alignment: 'center' });
			dataRow.push({ text: 'hsn', style: 'tableHeader', fontSize: 9, alignment: 'center' });
			dataRow.push({ text: 'hsn', style: 'tableHeader', fontSize: 9, alignment: 'center' });
			dataRow.push({ text: 'hsn', style: 'tableHeader', fontSize: 9, alignment: 'center' });

			bodyData.push(bodyData);
		}

		let action = 'open';
		let docDefinition = {
			content: [
				{
					text: 'Tax Invoice',
					fontSize: 16,
					alignment: 'center',
					color: '#047886',
					decoration: 'underline'
				},
				{
					text: '' + this.companyDetails.company_name,
					fontSize: 20,
					bold: true,
					alignment: 'center',
					color: 'skyblue'
				},
				{
					text:
						'' +
						this.companyDetails.street_address +
						',' +
						this.companyDetails.city_name +
						' At/Post/Tal. ' +
						this.companyDetails.tahsil_name +
						',Dist-' +
						this.companyDetails.district_name +
						'-' +
						this.companyDetails.pin_code,
					fontSize: 12,
					bold: false,
					alignment: 'center',
					color: 'skyblue'
				},
				{
					text: 'Email : gawadesubhash532@gmail.com',
					fontSize: 12,
					bold: false,
					alignment: 'center',
					color: 'skyblue'
				},
				{
					text: 'Mob.No. ' + this.companyDetails.mobile_number,
					fontSize: 12,
					bold: false,
					alignment: 'center',
					color: 'skyblue'
				},
				// {
				// 	columns: [
				// 		[
				// 			{
				// 				text: 'Nagraj',
				// 				bold: true
				// 			},
				// 			{ text: 'Radhanagari' },
				// 			{ text: 'Something' },
				// 			{ text: 'something' }
				// 		],
				// 		[
				// 			{
				// 				text: `Date: ${new Date().toLocaleString()}`,
				// 				alignment: 'right'
				// 			},
				// 			{
				// 				text: `Bill No : ${(Math.random() * 1000).toFixed(0)}`,
				// 				alignment: 'right'
				// 			}
				// 		]
				// 	]
				// },
				// {
				// 	text: 'Order Details',
				// 	style: 'sectionHeader'
				// },
				{
					table: {
						margin: [ 0, 20, 50, 0 ],
						layout: 'lightHorizontalLines',
						headerRows: 2,
						widths: [ '*', '*', '*', '*' ],
						body: [
							[
								'Company GSTIN',
								'' + this.companyDetails.company_gst_no,
								'Company PAN No.',
								'' + this.companyDetails.company_pan_no
							],
							[
								{
									colSpan: 2,
									text: 'TO,',
									border: [ true, false, false, false ]
								},
								'',
								'Invoice No.',
								'' + this.saleDetailsForm.controls['invoice_no'].value
							],
							[
								{
									colSpan: 2,
									text: '' + this.selectedCustomerObj.customer_name + ',',
									border: [ true, false, false, false ]
								},
								'',
								'EWay Bill No.',
								'' + this.saleDetailsForm.controls['eWayBillNumber'].value
							],
							[
								{
									colSpan: 2,
									text:
										'' +
										this.selectedCustomerObj.customer_address +
										' ' +
										this.selectedCustomerObj.customer_tahsil,
									border: [ true, false, false, false ]
								},
								'',
								'Date Of Issue',
								''
							],
							[
								{
									colSpan: 2,
									text:
										'Dist-' +
										this.selectedCustomerObj.customer_district +
										'-' +
										this.selectedCustomerObj.customer_pin_code,
									border: [ true, false, false, false ]
								},
								'',
								'Dispatch Through',
								'' + this.saleDetailsForm.controls['dispatch_through'].value
							],
							[
								{
									colSpan: 2,
									text: 'Mob. No. ' + this.selectedCustomerObj.customer_mobile_no,
									border: [ true, false, false, false ]
								},
								'',
								'Vehicle No.',
								'' + this.saleDetailsForm.controls['vehicle_number'].value
							],
							[
								{ text: 'Customer GSTIN', border: [ true, true, true, false ] },
								{
									text: '' + this.selectedCustomerObj.customer_gst_no,
									border: [ true, true, true, false ]
								},
								{ text: 'Delivery Note', border: [ true, true, true, false ] },
								{ text: '', border: [ true, true, true, false ] }
							]
							// ...this.invoice.products.map((p) => [
							// 	p.name,
							// 	p.price,
							// 	p.qty,
							// 	(p.price * p.qty).toFixed(2)
							// ]),
							// [
							// 	{ text: 'Total Amount', colSpan: 3 },
							// 	{},
							// 	{},
							// 	this.invoice.products.reduce((sum, p) => sum + p.qty * p.price, 0).toFixed(2)
							// ]
						]
					}
				},
				{
					layout: 'noBorders',
					table: {
						headerRows: 1,
						widths: [ 35, 55, '*', 50, 50, 30, 60 ],
						body: [
							// bodyData,
							[ 'Sr.No.', 'HSN/SAC', 'Particulars', 'Quantity', 'Rate', 'Per', 'Amount' ],
							...this.selectedProductList.map((p) => [
								'',
								p.hsn_or_sac_code,
								p.product_name,
								p.quantity + ' ' + p.quantityPerUnit,
								p.rate,
								'',
								''
							]),
							[
								{},
								{},
								{ text: 'Total', border: [ true, true, true, true ] },
								{
									text: '' + this.totalQuantity + '' + this.totalQuantityUnit,
									border: [ true, true, true, true ]
								},
								{},
								{},
								{ text: '' + this.totalSellingCost, border: [ true, true, true, true ] }
							],
							[
								{},
								{},
								{ text: 'Output CGST ' + this.cgst + ' %', border: [ true, true, true, true ] },
								{ text: '', border: [ true, true, true, true ] },
								{},
								{},
								{ text: '' + this.cgst_amount, border: [ true, true, true, true ] }
							],
							[
								{},
								{},
								{ text: 'Output SGST ' + this.sgst + ' %', border: [ true, true, true, true ] },
								{ text: '', border: [ true, true, true, true ] },
								{},
								{},
								{ text: '' + this.sgst_amount, border: [ true, true, true, true ] }
							],
							[
								{},
								{},
								{ text: 'Output IGST ' + this.igst + ' %', border: [ true, true, true, true ] },
								{ text: '', border: [ true, true, true, true ] },
								{},
								{},
								{ text: '' + this.igst_amount, border: [ true, true, true, true ] }
							],
							[
								{},
								{},
								{ text: 'Round Off', border: [ true, true, true, true ] },
								{ text: '', border: [ true, true, true, true ] },
								{},
								{},
								{ text: '', border: [ true, true, true, true ] }
							],
							[
								{},
								{},
								{ text: 'Grand Total', border: [ true, true, true, true ] },
								{ text: '', border: [ true, true, true, true ] },
								{},
								{},
								{ text: '' + this.totalTaxableSellingAmount, border: [ true, true, true, true ] }
							],
							[
								{
									text: 'Amount in words :',
									colSpan: 7,
									fontSize: 11,
									bold: true,
									border: [ true, true, true, false ]
								},
								{},
								{},
								{},
								{},
								{},
								{}
							],
							[
								{
									text: '' + this.numberToWordsPipe.transform(this.totalTaxableSellingAmount),
									colSpan: 7,
									fontSize: 11,
									border: [ true, false, true, true ]
								},
								{},
								{},
								{},
								{},
								{},
								{}
							],
							[
								{
									text: 'Declaration :',
									colSpan: 7,
									fontSize: 11,
									bold: true,
									border: [ true, true, true, false ]
								},
								{},
								{},
								{},
								{},
								{},
								{}
							],
							[
								{
									text:
										'We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.',
									colSpan: 7,
									fontSize: 11,
									border: [ true, false, true, true ]
								},
								{},
								{},
								{},
								{},
								{},
								{}
							],
							[
								{
									text: 'Company Bank Details :',
									colSpan: 3,
									bold: true,
									fontSize: 12
								},
								{},
								{},
								{
									text: '',
									border: [ false, false, false, false ]
								},
								{
									text: '',
									border: [ false, false, false, false ]
								},
								{
									text: '',
									border: [ false, false, false, false ]
								},
								{
									text: '',
									border: [ false, false, true, false ]
								}
							],
							[
								{
									text: 'Bank Name :',
									colSpan: 2,
									bold: true,
									fontSize: 11
								},
								{},
								{
									text: '' + this.selectedBankObj.bank_name,
									bold: true,
									fontSize: 11
								},
								{
									text: 'For ' + this.companyDetails.company_name,
									colSpan: 4,
									alignment: 'center',
									bold: true,
									fontSize: 12,
									border: [ false, false, true, false ]
								},
								{
									text: '',
									border: [ false, false, true, false ]
								},
								{
									text: '',
									border: [ false, false, true, false ]
								},
								{
									text: '',
									border: [ false, false, true, false ]
								}
							],
							[
								{
									text: 'Account No. :',
									colSpan: 2,
									bold: true,
									fontSize: 11
								},
								{},
								{
									text: '' + this.selectedBankObj.account_number,
									bold: true,
									fontSize: 11
								},
								{
									text: '',
									border: [ false, false, false, false ]
								},
								{
									text: '',
									border: [ false, false, false, false ]
								},
								{
									text: '',
									border: [ false, false, false, false ]
								},
								{
									text: '',
									border: [ false, false, true, false ]
								}
							],
							[
								{
									text: 'Branch Name :',
									colSpan: 2,
									bold: true,
									fontSize: 11
								},
								{},
								{
									text: '' + this.selectedBankObj.branch_name,
									bold: true,
									fontSize: 11
								},
								{
									text: '',
									border: [ false, false, false, false ]
								},
								{
									text: '',
									border: [ false, false, false, false ]
								},
								{
									text: '',
									border: [ false, false, false, false ]
								},
								{
									text: '',
									border: [ false, false, true, false ]
								}
							],
							[
								{
									text: 'IFSC Code :',
									colSpan: 2,
									bold: true,
									fontSize: 11
								},
								{},
								{
									text: '' + this.selectedBankObj.ifsc_code,
									bold: true,
									fontSize: 11
								},
								{
									text: 'Authorized Signature',
									colSpan: 4,
									fontSize: 11,
									alignment: 'center',
									border: [ false, false, true, true ]
								},
								{},
								{},
								{}
							]
						]
					}
				}
			],
			styles: {
				sectionHeader: {
					bold: true,
					decoration: 'underline',
					fontSize: 14,
					margin: [ 0, 15, 0, 15 ]
				}
			}
		};

		if (action === 'download') {
			pdfMake.createPdf(docDefinition).download();
		} else if (action === 'print') {
			pdfMake.createPdf(docDefinition).print();
		} else {
			pdfMake.createPdf(docDefinition).open();
		}
	}

	saveOrUpdate: any;
	submitSaleInvoice() {
		let iDate = this.saleDetailsForm.controls['invoice_date'].value;
		console.log(Number.isNaN(0));
		let customer_id = this.saleDetailsForm.controls['customer_id'].value.split('-');
		let invoice_id = this.saleDetailsForm.controls['invoice_no'].value.split('/');
		let sellingDetails = {
			saveOrUpdate: this.saveOrUpdate,
			product_details: this.selectedProductList,
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
		console.log(sellingDetails);

		this.saleInvoiceService.saveSaleInvoiceDetails(sellingDetails).subscribe(
			(data) => {
				console.log(data['success']);
			},
			(error) => {}
		);
	}

	getYYYYMMDDFormat(dateJson) {
		return "'" + dateJson.date.year + '-' + dateJson.date.month + '-' + dateJson.date.day + "'";
	}

	getDetailsForSaleInvoice() {
		this.saleInvoiceService.getDetailsForSaleInvoice().subscribe(
			(data) => {
				this.companyDetails = data[0][0];
				console.log(data[1][0].max_invoice_id);
				if (data[1][0].max_invoice_id == null) {
					this.saveOrUpdate = 1;
					this.saleDetailsForm.controls['invoice_no'].setValue(new Date().getFullYear() + '/1');
				} else {
					this.saveOrUpdate = 2;
					let latestInvoiceNo = new Date().getFullYear() + '/' + (data[1][0].max_invoice_id + 1);
					this.saleDetailsForm.controls['invoice_no'].setValue(latestInvoiceNo);
				}
			},
			(error) => {}
		);
	}
	companyDetails: any = {};

	getDetailsOfSaleInvoice() {
		this.saleInvoiceService.getDetailsOfSaleInvoice(this.saleDetailsForm.controls['invoice_no'].value).subscribe(
			(data) => {
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
			(error) => {}
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

	exportInvoice() {
		const doc = new jsPDF();
		doc.setFont('Calibri');
		doc.setFontSize(12);
		doc.text('TAX INVOICE', 105, 15, 'center');
		doc.setFontSize(15);
		doc.setFontType('bold');
		doc.text('' + this.companyDetails.company_name, 105, 25, 'center');
		doc.setFontSize(12);
		doc.setFontType('normal');
		doc.text('M.No.1649, Chandgad At / Post / Tal - Chandgad, Dist - Kolhapur - 416509', 105, 30, 'center');
		doc.text('Email : gavadesubhash532@gmail.com', 105, 35, 'center');
		doc.text('Mob. No. : ' + this.companyDetails.mobile_number, 105, 40, 'center');
		doc.setDrawColor(0);
		doc.setFillColor(255, 255, 255);
		doc.rect(3, 50, 150, 83, 'FD'); //Fill and Border
		var string = doc.output('datauristring');
		var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
		var x = window.open();
		x.document.open();
		x.document.write(iframe);
		x.document.close();
		//doc.autoPrint();
	}
}
