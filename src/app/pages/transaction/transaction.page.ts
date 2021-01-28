import { NavController } from '@ionic/angular';
import { Component, OnInit, Injector } from '@angular/core';
import { Base } from 'src/app/utils/base.class';
import { TransactionHeaderModel } from 'src/app/utils/models/Transaction.model';
import { CustomerCardModel } from 'src/app/utils/models/CustomerCard.model';
import { ReceiptPage } from './receipt/receipt.page';
import { ModalPage } from '../components/modal-page/modal-page.page';
interface ITransactionFilter {
  startDate: Date;
  endDate: Date;
}
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage extends Base implements OnInit {
  transactionList: TransactionHeaderModel[] = [];
  customerCardList: CustomerCardModel[];
  customerCard: CustomerCardModel = {} as CustomerCardModel;

  filterModel: ITransactionFilter = {} as ITransactionFilter;
  searchTxt: any = "";

  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit() {
    // let date = new Date();
    // this.filterModel.startDate = new Date(date.getFullYear(), date.getMonth(), 1);;
    // this.filterModel.endDate = date;

    // this.getTransactions(this.filterModel.startDate,this.filterModel.endDate);
    this.getCustomerCards();
  }
  getCustomerCards() {
    this.storageService.customerCards.then(res => {
      if (res) {
        this.customerCardList = res;
        this.customerCardList.forEach(el => {
          if (el.Card_Type == 1) {
            this.customerCard = el;
          }
        })
      }
      console.log(this.customerCardList)
    })
  }
  getTransactions(startDate, endDate) {
    this.presentLoading();
    this.apiService.getTransactionHeader("2326671000004290", startDate, endDate).subscribe(res => {
      this.transactionList = res;
      this.dismissLoading();
      console.log(res);
    }, error => this.dismissLoading())
  }

  viewReceipt(data: TransactionHeaderModel) {
    this.openModal(ReceiptPage, data.transactionId, data);
  }
  filter() {
    this.getTrans("transFilterTitle").then(title => {
      this.openModal(ModalPage, title, this.filterModel, "transactionFilter").then((res: any) => {
        if (res.startDate)
          this.getTransactions(res.startDate, res.endDate);
      })
    })

  }
}
