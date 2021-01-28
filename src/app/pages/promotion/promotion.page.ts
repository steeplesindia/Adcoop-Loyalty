import { NavController } from '@ionic/angular';
import { Component, OnInit, Injector } from '@angular/core';
import { Base } from 'src/app/utils/base.class';
import { PromotionsModel } from 'src/app/utils/models/Promo.model';
interface Promo {
  ObjectId: any;
  BrochureName: string;
  BrochureURL: string;
  StartDate: Date;
  EndDate: Date;
}
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.page.html',
  styleUrls: ['./promotion.page.scss'],
})
export class PromotionPage extends Base implements OnInit {
  promotionList: PromotionsModel[] = [];
  selectedPromotion: PromotionsModel = {} as PromotionsModel;
  authenticated:boolean;

  constructor(injector: Injector) {
    super(injector);
    this.authService.authChange$.subscribe(res => this.authenticated = res);
  }
  ngOnInit() {
    this.getPromos();
  }
  getPromos() {
    this.storageService.promotions.then(res=>{
      if(res){
        this.mapToObj(res);
      }
    })
    this.apiService.getPromotions("").subscribe(res => {
        this.storageService.setPromotions(res);
        this.mapToObj(res)
        console.log(this.promotionList);
      })
  }  

  mapToObj(promoList){
    this.promotionList = promoList;
    this.selectedPromotion = promoList[0];
  }
}
