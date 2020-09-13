import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	// tslint:disable-next-line
	selector: 'body',
	template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
	constructor(private router: Router, public translate: TranslateService) {
		translate.addLangs([ 'en', 'mr' ]);
		translate.setDefaultLang('en');
		const browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|mr/) ? browserLang : 'en');
	}

	ngOnInit() {
		this.router.events.subscribe((evt) => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			window.scrollTo(0, 0);
		});
	}
}
