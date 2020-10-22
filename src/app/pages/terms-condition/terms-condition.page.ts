import { LoadingController } from '@ionic/angular';
import { Component, Injector, OnInit } from '@angular/core';
import { Base } from 'src/app/utils/base.class';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.page.html',
  styleUrls: ['./terms-condition.page.scss'],
})
export class TermsConditionPage extends Base implements OnInit {



  constructor(injector: Injector) {
    super(injector);

  }

  getTermsServiceCall() {
    this.apiService.getTermsConditionContext("en").subscribe(
      res => {
        res.forEach(element => {
          if (element.Placeholder == '5')
            this.storageService.setTermsNConditions(element.TextContent);
        });

      }, error => {
      })
  }

  ngOnInit() {
    this.getTermsServiceCall();
  }

}
