import { NavController, NavParams } from '@ionic/angular';
import { Component, OnInit, Injector } from '@angular/core';
import { Base } from 'src/app/utils/base.class';
import { PromotionsModel } from 'src/app/utils/models/Promo.model';
import { TransactionDetailsModel, TransactionHeaderModel } from 'src/app/utils/models/Transaction.model';
interface Promo {
  ObjectId: any;
  BrochureName: string;
  BrochureURL: string;
  StartDate: Date;
  EndDate: Date;
}
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage extends Base implements OnInit {
  transactionDetails: TransactionDetailsModel[] = [];
  transactionHeader:TransactionDetailsModel ;
  title;
  constructor(injector: Injector, private navParams: NavParams) {
    super(injector);
    this.title = this.navParams.get('title');
    this.transactionHeader = this.navParams.get('value');
  }
  ngOnInit() {
    this.getTransactionDetails();
  }

  getTransactionDetails(){
    this.apiService.getTransactionDetails(this.transactionHeader.storeId,this.transactionHeader.CardNumber,this.transactionHeader.transactionId).subscribe(res=>{
      this.transactionDetails = res;
      console.log(res)
    })
  }
  close() {
    this.popoverCtrl.dismiss(null);
  }
}
