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

  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit() {
    this.getPromos();
  }
  getPromos() {
    this.apiService.getPromotions("").subscribe(
      res => {
        this.promotionList = res;
        this.selectedPromotion = this.promotionList[0];
        console.log(this.promotionList);
      }, (error) => {
      })
  }  
}
