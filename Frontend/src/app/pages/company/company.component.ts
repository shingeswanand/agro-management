import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { CompanyDetailsService } from '../../services/company/company-details.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
	selector: 'app-company',
	templateUrl: './company.component.html',
	styleUrls: [ './company.component.css' ]
})
export class CompanyComponent implements OnInit {
	companyDetailsForm: FormGroup;
	ownerDetailsForm: FormGroup;
	companyId: any;
	userId: any;
	companyName: any;
	public loading = false;
	constructor(
		public translate: TranslateService,
		private fb: FormBuilder,
		private companyDetailsService: CompanyDetailsService,
		public toastrService: ToastrService,
		private ngxLoader: NgxUiLoaderService
	) {
		// translate.addLangs(['en','mr']);
		// translate.setDefaultLang('en');
		// const browserLang=translate.getBrowserLang();
		// translate.use(browserLang.match(/en|mr/)?browserLang:'en');
		console.log(translate);
	}
	ngOnInit(): void {
		this.companyId = atob(localStorage.getItem('companyId'));
		this.companyName = atob(localStorage.getItem('companyName'));
		this.userId = atob(localStorage.getItem('userId'));

		this.ownerDetailsForm = this.fb.group({
			owner_id: [ '' ],
			owner_name: [ '' ],
			street_address: [ '' ],
			city_name: [ '' ],
			tahsil_name: [ '' ],
			district_name: [ '' ],
			state_id: [ '' ],
			pin_code: [ '' ],
			phone_no: [ '' ],
			mobile_no: [ '' ],
			alt_mobile_no: [ '' ],
			adhaar_card_no: [ '' ],
			pan_card_no: [ '' ]
		});

		this.companyDetailsForm = this.fb.group({
			company_id: this.companyId,
			company_name: this.companyName,
			company_email:[''],
			company_gst_no: [ '' ],
			company_pan_no: [ '' ],
			current_rate: [ '' ],
			street_address: [ '' ],
			city_name: [ '' ],
			tahsil_name: [ '' ],
			district_name: [ '' ],
			state_id: [ '' ],
			pin_code: [ '' ],
			state_code: [ '' ],
			phone_no: [ '' ],
			mobile_no: [ '' ],
			alt_mobile_no: [ '' ],
			company_tagline: [ '' ]
		});

		this.getCompanyDetails();
		this.getOwnerDetails();
	}

	company_details: any;
	getCompanyDetails() {
		this.ngxLoader.start();
		this.companyDetailsService.getCompanyDetails(this.companyId).subscribe(
			(data) => {
				console.log(data);
				this.ngxLoader.stop();
				this.company_details = data;
				if (this.company_details.length > 0) {
					this.companyDetailsForm.controls['company_email'].setValue(data[0].company_email);
					this.companyDetailsForm.controls['company_gst_no'].setValue(data[0].company_gst_no);
					this.companyDetailsForm.controls['company_pan_no'].setValue(data[0].company_pan_no);
					this.companyDetailsForm.controls['street_address'].setValue(data[0].street_address);
					this.companyDetailsForm.controls['city_name'].setValue(data[0].city_name);
					this.companyDetailsForm.controls['pin_code'].setValue(data[0].pin_code);
					this.companyDetailsForm.controls['tahsil_name'].setValue(data[0].tahsil_name);
					this.companyDetailsForm.controls['district_name'].setValue(data[0].district_name);
					this.companyDetailsForm.controls['state_id'].setValue(data[0].state_id);
					this.companyDetailsForm.controls['state_code'].setValue(data[0].state_code);
					this.companyDetailsForm.controls['phone_no'].setValue(data[0].phone_number);
					this.companyDetailsForm.controls['mobile_no'].setValue(data[0].mobile_number);
					this.companyDetailsForm.controls['alt_mobile_no'].setValue(data[0].alternate_mobile_number);
					this.companyDetailsForm.controls['company_tagline'].setValue(data[0].company_tagline);
				}
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
				this.ngxLoader.stop();
			}
		);
	}

	owner_details: any;
	getOwnerDetails() {
		this.ngxLoader.start();
		this.companyDetailsService.getOwnerDetails(this.companyId).subscribe(
			(data) => {
				this.ngxLoader.stop();
				console.log(data);
				this.owner_details = data;
				if (this.owner_details.length > 0) {
					this.ownerDetailsForm.controls['owner_id'].setValue(data[0].owner_id);
					this.ownerDetailsForm.controls['owner_name'].setValue(data[0].owner_name);
					this.ownerDetailsForm.controls['street_address'].setValue(data[0].street_address);
					this.ownerDetailsForm.controls['city_name'].setValue(data[0].city_name);
					this.ownerDetailsForm.controls['pin_code'].setValue(data[0].pin_code);
					this.ownerDetailsForm.controls['tahsil_name'].setValue(data[0].tahsil_name);
					this.ownerDetailsForm.controls['district_name'].setValue(data[0].district_name);
					this.ownerDetailsForm.controls['state_id'].setValue(data[0].state_id);
					this.ownerDetailsForm.controls['phone_no'].setValue(data[0].phone_number);
					this.ownerDetailsForm.controls['mobile_no'].setValue(data[0].mobile_number);
					this.ownerDetailsForm.controls['alt_mobile_no'].setValue(data[0].alternate_mobile_number);
					this.ownerDetailsForm.controls['adhaar_card_no'].setValue(data[0].adhaar_card_no);
					this.ownerDetailsForm.controls['pan_card_no'].setValue(data[0].pan_card_no);
				}
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
				this.ngxLoader.stop();
			}
		);
	}

	saveCompanyDetails() {
		this.ngxLoader.start();

		let companyDetails = {
			company_id: this.companyDetailsForm.controls['company_id'].value,
			company_email: this.companyDetailsForm.controls['company_email'].value,
			company_gst_no: this.companyDetailsForm.controls['company_gst_no'].value,
			company_pan_no: this.companyDetailsForm.controls['company_pan_no'].value,
			street_address: this.companyDetailsForm.controls['street_address'].value,
			city_name: this.companyDetailsForm.controls['city_name'].value,
			tahsil_name: this.companyDetailsForm.controls['tahsil_name'].value,
			district_name: this.companyDetailsForm.controls['district_name'].value,
			state_id: this.companyDetailsForm.controls['state_id'].value,
			pin_code: this.companyDetailsForm.controls['pin_code'].value,
			state_code: this.companyDetailsForm.controls['state_code'].value,
			phone_no: this.companyDetailsForm.controls['phone_no'].value,
			mobile_no: this.companyDetailsForm.controls['mobile_no'].value,
			alt_mobile_no: this.companyDetailsForm.controls['alt_mobile_no'].value,
			company_tagline: this.companyDetailsForm.controls['company_tagline'].value,
			record_updated_by: this.userId,
			record_updated_date: new Date().toISOString().split('T')[0]
		};
		this.companyDetailsService.saveOrUpdateCompanyDetails(companyDetails).subscribe(
			(data) => {
				this.getCompanyDetails();
				this.toastrService.success(data['success'], 'Success!');
				this.ngxLoader.stop();
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
				this.ngxLoader.stop();
			}
		);
	}

	saveCompanyOwnerDetails() {
		this.ngxLoader.start();

		let companyOwnerDetails = {
			companyId: this.companyId,
			owner_id: this.ownerDetailsForm.controls['owner_id'].value,
			owner_name: this.ownerDetailsForm.controls['owner_name'].value,
			adhaar_card_no: this.ownerDetailsForm.controls['adhaar_card_no'].value,
			pan_card_no: this.ownerDetailsForm.controls['pan_card_no'].value,
			street_address: this.ownerDetailsForm.controls['street_address'].value,
			city_name: this.ownerDetailsForm.controls['city_name'].value,
			tahsil_name: this.ownerDetailsForm.controls['tahsil_name'].value,
			district_name: this.ownerDetailsForm.controls['district_name'].value,
			state_id: this.ownerDetailsForm.controls['state_id'].value,
			pin_code: this.ownerDetailsForm.controls['pin_code'].value,
			phone_no: this.ownerDetailsForm.controls['phone_no'].value,
			mobile_no: this.ownerDetailsForm.controls['mobile_no'].value,
			alt_mobile_no: this.ownerDetailsForm.controls['alt_mobile_no'].value,
			record_updated_by: this.userId,
			record_updated_date: new Date().toISOString().split('T')[0]
		};
		this.companyDetailsService.saveOrUpdateCompanyOwnerDetails(companyOwnerDetails).subscribe(
			(data) => {
				this.ngxLoader.stop();

				this.toastrService.success(data['success'], 'Success!');
				this.getOwnerDetails();
			},
			(error) => {
				this.toastrService.error(error.error.message, 'Error!');
				this.ngxLoader.stop();
			}
		);
	}
}
