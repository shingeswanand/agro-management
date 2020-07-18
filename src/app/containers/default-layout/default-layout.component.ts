import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { navItemsMR } from '../../_navMR';

// import {navbar} from '../../views/base/navbars/navbars.component.ts';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(public translate:TranslateService) { 
    // translate.addLangs(['en','mr']);
    // translate.setDefaultLang('en');
    // const browserLang=translate.getBrowserLang();
    // translate.use(browserLang.match(/en|mr/)?browserLang:'en');
  }
  //constructor(){}
  changeLang(lang)
  {
    if(lang=='mr')
    {
      this.navItems=navItemsMR;
    }
    else
    {
      this.navItems=navItems;
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
