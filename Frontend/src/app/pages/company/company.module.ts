import { NgModule } from '@angular/core';
import { CompanyComponent } from './company.component';
import { CompanyRoutingModule, routes } from './company-routing.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
	declarations: [ CompanyComponent ],
	imports: [ CompanyRoutingModule, FormsModule,TabsModule, ReactiveFormsModule, TranslateModule, RouterModule.forChild(routes) ]
})
export class CompanyModule {}
