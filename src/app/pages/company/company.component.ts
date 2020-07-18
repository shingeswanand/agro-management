import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(public translate:TranslateService) { 
    // translate.addLangs(['en','mr']);
    // translate.setDefaultLang('en');
    // const browserLang=translate.getBrowserLang();
    // translate.use(browserLang.match(/en|mr/)?browserLang:'en');
    console.log(translate);
  }
  ngOnInit(): void {
  }

}
