import { Component, Injector, OnInit } from '@angular/core';
import { Base } from 'src/app/utils/base.class';

@Component({
  selector: 'app-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage extends Base implements OnInit {

  policyLabel: any = "";
  constructor(injector: Injector) {
    super(injector);
  }


  getPolicyLabelServiceCall() {
    this.storageService.privacyPolicy.then(res=>{
      if(res)
        this.policyLabel = res
    })
    this.apiService.getPolicyContext().subscribe(res => {
      res.forEach(element => {
        if (element.Placeholder == '6') {
          this.policyLabel = element.TextContent;
          this.storageService.setPrivacyPolicy(element.TextContent);
        }
      });
    })
  }
  ngOnInit() {
    this.getPolicyLabelServiceCall();
  }

}
