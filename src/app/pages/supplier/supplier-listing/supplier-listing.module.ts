import { NgModule } from '@angular/core';
import { SupplierListingComponent } from './supplier-listing.component';
import {SupplierListingRoutingModule,routes} from './supplier-listing-routing.module';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [SupplierListingComponent],
  imports: [
    TranslateModule,
    SupplierListingRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class SupplierListingModule { }
