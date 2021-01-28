import { LoadingController } from '@ionic/angular';
import { Component, Injector, OnInit } from '@angular/core';
import { Base } from 'src/app/utils/base.class';
import { AppConstantData } from 'src/app/utils/constant';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage extends Base implements OnInit {
  aboutUsLabel: any = "";
  readMore: any = [];
  
  constructor(injector: Injector) {
    super(injector);
    this.readMore = {
      benefits: { value: false },
      earnPoints: { value: false }
    }    
  }

  toggleDetails(data) {
    data.value = !data.value;
  }

  ngOnInit() {
    this.aboutUsLabel = AppConstantData.aboutUsContext[this.apiService.language];    
  }

}
