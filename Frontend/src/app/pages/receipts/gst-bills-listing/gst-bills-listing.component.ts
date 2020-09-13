import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-gst-bills-listing',
	templateUrl: './gst-bills-listing.component.html',
	styleUrls: [ './gst-bills-listing.component.css' ]
})
export class GstBillsListingComponent implements OnInit {
	constructor(public translate: TranslateService, private router: Router) {}

	ngOnInit(): void {}

	create_gst_invoice() {
		this.router.navigate([ 'receipts/create_gst_invoice' ]);
	}
}
