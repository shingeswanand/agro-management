import { NgModule } from '@angular/core';
import { CompanyComponent } from './company.component';
import {CompanyRoutingModule,routes} from './company-routing.module';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CompanyRoutingModule,
    TranslateModule,
    RouterModule.forChild(routes),

  ]
})
export class CompanyModule { }
