import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Base } from 'src/app/utils/base.class';
import { CustomerCardModel } from 'src/app/utils/models/CustomerCard.model';
import { environment } from 'src/environments/environment';
import * as JsBarcode from 'jsbarcode';
@Component({
  selector: 'card-details',
  templateUrl: './card-details.page.html',
  styleUrls: ['./card-details.page.scss'],
})
export class CardDetailsPage extends Base {
  @Input()customerCard: CustomerCardModel;
  @Input('index') i;

  @ViewChild('slides', { static: true }) slides: IonSlides;
  FeaturedSliderConfig = {
    slidesPerView: 1,
  };
  constructor(injector: Injector) {
    super(injector);
    setTimeout(() => {
      this.generateBarCode(this.customerCard.CardNumber)
    }, 1000);   
  }
  generateBarCode(cardNo) {
    JsBarcode("#barcode", cardNo,{
      width:1,
      height:40,
      fontSize: 14,
      textMargin: 0,
      margin:0,
      marginBottom:0,
      displayValue: false
    });
  }
}
