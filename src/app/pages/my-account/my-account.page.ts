import { Component, OnInit, Injector } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Base } from 'src/app/utils/base.class';
import { CustomerCardModel } from 'src/app/utils/models/CustomerCard.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage extends Base implements OnInit {

  authenticated: boolean;
  customerCardList: CustomerCardModel[];
  customerCard: CustomerCardModel = {} as CustomerCardModel;

  language: any;

  constructor(injector: Injector) {
    super(injector)
    this.authService.authChange$.subscribe(res => {
      this.authenticated = res
      if (this.authenticated) this.getCustomerCards();
    });

    this.language = this.apiService.language;


  }

  ngOnInit() {

  }
  navigatePage(url) {
    this.navigate(url)
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

  languageChange(ev) {
    let lang = ev.detail.value
    this.translate.use(lang);

    this.apiService.setLanguageChange(lang);
    this.storageService.setLanguage(lang);
  }
}
