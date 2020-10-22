import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { NavController, IonSlides, AlertController } from '@ionic/angular';
import { Base } from 'src/app/utils/base.class';

@Component({
  selector: 'dashboard-guest',
  templateUrl: './dashboard-guest.page.html',
  styleUrls: ['./dashboard-guest.page.scss'],
})
export class DashboardGuestPage extends Base implements OnInit {

  @ViewChild('slides', { static: true }) slides: IonSlides
  truncating0 = true;
  truncating1 = true;
  truncating2 = true;
  truncating3 = true;


  slideOptions;
  coupons: any = 0;

  cardExists: boolean;

  headerSlider = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  buttonList:any= [];
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(){
    
  }
  
}
