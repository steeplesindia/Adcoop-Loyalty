import { NavController } from '@ionic/angular';
import { Component, OnInit, Injector } from '@angular/core';
import { Base } from 'src/app/utils/base.class';
import { PromotionsModel } from 'src/app/utils/models/Promo.model';
import { StoreModel } from 'src/app/utils/models/Store.model';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-replace-card',
  templateUrl: './replace-card.page.html',
  styleUrls: ['./replace-card.page.scss'],
})
export class ReplaceCardPage extends Base implements OnInit {
  reason: any;
  storeList: StoreModel;
  storeName: any;

  reasonList: any[] = [];
  searchedItem: any = "";
  custId: any;
  showSpinner: boolean;

  constructor(injector: Injector) {
    super(injector);
    this.reasonList = [
      "Lost", "Stolen", "Barcode not readable/ visible", "Card is broken/ mutilated"
    ]
    this.storageService.customerId.then(res => {
      if (res) {
        this.custId = res;
      }
    })

  }
  ngOnInit() {
    this.storageService.stores.then(res=>{
      if(res){
        this.storeList = res;
      }
    })
    this.getStores();
  }
  async getStores() {
    this.apiService.getStoresList("", "").subscribe(res => {
      this.storeList = res;
      this.storageService.setStores(res);
    })
  }

  selectedStore(store) {
    this.storeName = store.StoreName
    console.log(store)
  }
  checkValid() {
    return this.storeName && this.reason
  }
  submit() {
    if (this.checkValid()) {
      this.showSpinner = true;
      this.apiService.replaceCard(this.custId, this.storeName, this.reason).subscribe(res => {
        console.log(res);
        this.showSpinner = false;
        this.showToast("Request submitted successfully");
        this.goback(true);
      }, error => {
        console.log(error);
        this.showSpinner = false;
        this.showToast("Conection Error");
      })
    } else {
      this.showToast("Both the fields are required");
    }

  }
}
