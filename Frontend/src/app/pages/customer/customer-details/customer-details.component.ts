import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomerService } from '../../../services/customer/customer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-customer-details',
	templateUrl: './customer-details.component.html',
	styleUrls: [ './customer-details.component.css' ]
})
export class CustomerDetailsComponent implements OnInit {
	customerDetailsForm: FormGroup;

	customerId: any;
	companyId: any;
	userId: any;
	constructor(
		private customerService: CustomerService,
		private fb: FormBuilder,
		public toastrService: ToastrService,
		private ngxLoader: NgxUiLoaderService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		if (this.route.snapshot.paramMap.get('customer_id') != null) {
			this.customerId = atob(this.route.snapshot.paramMap.get('customer_id')); // get customer no from route
			this.fetchCustomerDetails();
		} else {
			this.customerId = undefined;
		}

		this.companyId = atob(localStorage.getItem('companyId'));
		this.userId = atob(localStorage.getItem('userId'));

		this.customerDetailsForm = this.fb.group({
			customer_name: [ '' ],
			customer_email: [ '' ],
			customer_address: [ '' ],
			customer_tahsil_name: [ '' ],
			customer_district_name: [ '' ],
			customer_state: [ '' ],
			customer_pin_code: [ '' ],
			customer_phone_no: [ '' ],
			customer_mobile_no: [ '' ],
			customer_alt_mobile_no: [ '' ],
			customer_adhaar_card_no: [ '' ],
			customer_pan_card_no: [ '' ],
			customer_gst_no: [ '' ]
		});
	}

	saveCustomerDetails() {
		this.ngxLoader.start();
		let customer_details = {
			company_id: this.companyId,
			customer_id: this.customerId,
			customer_name: this.customerDetailsForm.controls['customer_name'].value,
			customer_email: this.customerDetailsForm.controls['customer_email'].value,
			customer_address: this.customerDetailsForm.controls['customer_address'].value,
			customer_pin_code: this.customerDetailsForm.controls['customer_pin_code'].value,
			customer_tahsil_name: this.customerDetailsForm.controls['customer_tahsil_name'].value,
			customer_district_name: this.customerDetailsForm.controls['customer_district_name'].value,
			customer_state: this.customerDetailsForm.controls['customer_state'].value,
			customer_phone_no: this.customerDetailsForm.controls['customer_phone_no'].value,
			customer_mobile_no: this.customerDetailsForm.controls['customer_mobile_no'].value,
			customer_alt_mobile_no: this.customerDetailsForm.controls['customer_alt_mobile_no'].value,
			customer_adhaar_card_no: this.customerDetailsForm.controls['customer_adhaar_card_no'].value,
			customer_pan_card_no: this.customerDetailsForm.controls['customer_pan_card_no'].value,
			customer_gst_no: this.customerDetailsForm.controls['customer_gst_no'].value,
			record_updated_by: this.userId,
			record_updated_date: new Date().toISOString().split('T')[0]
		};

		this.customerService.saveOrUpdateCustomerDetails(customer_details).subscribe(
			(data) => {
				// this.getCompanyDetails();
				this.toastrService.success(data['success'], 'Success!');
				this.ngxLoader.stop();
				this.router.navigate([ '/customer_listing' ]);
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
				this.ngxLoader.stop();
			}
		);
	}

	fetchedCustomerDetails: any = {};
	fetchCustomerDetails() {
		this.ngxLoader.start();
		this.customerService.fetchCustomerDetails(this.customerId).subscribe(
			(data) => {
				// this.getCompanyDetails();
				//	this.toastrService.success(data['success'], 'Success!');
				this.fetchedCustomerDetails = data;
				this.customerDetailsForm.controls['customer_name'].setValue(this.fetchedCustomerDetails.customer_name);
				this.customerDetailsForm.controls['customer_email'].setValue(
					this.fetchedCustomerDetails.customer_email
				);
				this.customerDetailsForm.controls['customer_address'].setValue(
					this.fetchedCustomerDetails.customer_address
				);
				this.customerDetailsForm.controls['customer_pin_code'].setValue(
					this.fetchedCustomerDetails.customer_pin_code
				);
				this.customerDetailsForm.controls['customer_tahsil_name'].setValue(
					this.fetchedCustomerDetails.customer_tahsil
				);
				this.customerDetailsForm.controls['customer_district_name'].setValue(
					this.fetchedCustomerDetails.customer_district
				);
				this.customerDetailsForm.controls['customer_state'].setValue(
					this.fetchedCustomerDetails.customer_state
				);
				this.customerDetailsForm.controls['customer_phone_no'].setValue(
					this.fetchedCustomerDetails.customer_phone_no
				);
				this.customerDetailsForm.controls['customer_mobile_no'].setValue(
					this.fetchedCustomerDetails.customer_mobile_no
				);
				this.customerDetailsForm.controls['customer_alt_mobile_no'].setValue(
					this.fetchedCustomerDetails.customer_alt_mobile_no
				);
				this.customerDetailsForm.controls['customer_adhaar_card_no'].setValue(
					this.fetchedCustomerDetails.customer_adhaar_no
				);
				this.customerDetailsForm.controls['customer_pan_card_no'].setValue(
					this.fetchedCustomerDetails.customer_pan_no
				);
				this.customerDetailsForm.controls['customer_gst_no'].setValue(
					this.fetchedCustomerDetails.customer_gst_no
				);

				this.ngxLoader.stop();
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
				this.ngxLoader.stop();
			}
		);
	}
}
