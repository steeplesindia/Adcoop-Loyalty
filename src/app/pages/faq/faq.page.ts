import { Component, Injector, OnInit } from '@angular/core';
import { Base } from 'src/app/utils/base.class';
import { AppConstantData } from 'src/app/utils/constant';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage extends Base implements OnInit {

  faqList: any = "";
  constructor(injector: Injector) {
    super(injector);
  }

  toggle(faq) {
    if (faq.visible) {
      faq.visible = false;
      faq.icon = "add-circle"
    } else {
      faq.visible = true;
      faq.icon = "remove-circle"
    }
  }
  ngOnInit() {
    this.faqList = AppConstantData.faqContext[this.apiService.language];   
  }
}
