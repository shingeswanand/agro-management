import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER } from 'ngx-ui-loader';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [ DefaultLayoutComponent ];

import {
	AppAsideModule,
	AppBreadcrumbModule,
	AppHeaderModule,
	AppFooterModule,
	AppSidebarModule
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

// import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';

// export function HttpLoaderFactory(http:HttpClient){
//   return new TranslateHttpLoader(http);
// }

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
	bgsColor: 'red',
	bgsOpacity: 0.5,
	bgsPosition: 'bottom-right',
	bgsSize: 60,
	bgsType: 'ball-spin-clockwise',
	blur: 5,
	delay: 0,
	fastFadeOut: true,
	fgsColor: '#63c2de',
	fgsPosition: 'center-center',
	fgsSize: 60,
	fgsType: 'three-strings',
	gap: 24,
	logoPosition: 'center-center',
	logoSize: 120,
	logoUrl: '',
	masterLoaderId: 'master',
	overlayBorderRadius: '0',
	overlayColor: 'rgba(40, 40, 40, 0.8)',
	pbColor: 'red',
	pbDirection: 'ltr',
	pbThickness: 3,
	hasProgressBar: true,
	text: 'Please Wait...',
	textColor: '#000000',
	textPosition: 'center-center',
	maxTime: -1,
	minTime: 300
};

import en from '@angular/common/locales/en';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { TokenIntercepterService } from '../app/interceptor/token-interceptor.service';
registerLocaleData(en);

const antDesignIcons = AllIcons as {
	[key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);

@NgModule({
	imports: [
		ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: 'toast-top-right'
		}),
		NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		AppAsideModule,
		AppBreadcrumbModule.forRoot(),
		AppFooterModule,
		AppHeaderModule,
		AppSidebarModule,
		PerfectScrollbarModule,
		BsDropdownModule.forRoot(),
		TabsModule.forRoot(),
		ChartsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [ HttpClient ]
			}
		})
	],
	declarations: [ AppComponent, ...APP_CONTAINERS, P404Component, P500Component, LoginComponent, RegisterComponent ],
	providers: [
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenIntercepterService,
			multi: true
		},
		{ provide: NZ_I18N, useValue: en_US },
		{ provide: NZ_ICONS, useValue: icons }
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
