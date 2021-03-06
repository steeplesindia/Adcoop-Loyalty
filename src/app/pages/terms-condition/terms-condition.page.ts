import { LoadingController } from '@ionic/angular';
import { Component, Injector, OnInit } from '@angular/core';
import { Base } from 'src/app/utils/base.class';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.page.html',
  styleUrls: ['./terms-condition.page.scss'],
})
export class TermsConditionPage extends Base implements OnInit {
  termsLabel: any;
  constructor(injector: Injector) {
    super(injector);

  }

  getTermsServiceCall() {
    this.storageService.termsNConditions.then(res => {
      if (res) {
        this.termsLabel = res;
      }
    })
    this.apiService.getTermsConditionContext().subscribe(
      res => {
        res.forEach(element => {
          if (element.Placeholder == '5') {
            this.termsLabel = element.TextContent;
            this.storageService.setTermsNConditions(element.TextContent);
          }
        });
      })
  }

  ngOnInit() {
    this.getTermsServiceCall();
  }

}
