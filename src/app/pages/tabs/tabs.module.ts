import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { DashboardUserPage } from '../dashboard-user/dashboard-user.page';
import { DashboardGuestPage } from '../dashboard-guest/dashboard-guest.page';
import { HeaderPage } from '../components/Header/header.page';
import { PromotionPage } from '../promotion/promotion.page';
import { MyAccountPage } from '../my-account/my-account.page';
import { StorePage } from '../store/store.page';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { ContactUsPage } from '../contact-us/contact-us.page';
import { TermsConditionPage } from '../terms-condition/terms-condition.page';
import { FaqPage } from '../faq/faq.page';
import { MyCardsPage } from '../my-cards/my-cards.page';
import { CardDetailsPage } from '../my-cards/card-details/card-details.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ReplaceCardPage } from '../replace-card/replace-card.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProfilePage } from '../profile/profile.page';
import { AboutUsPage } from '../about-us/about-us.page';
import { TransactionPage } from '../transaction/transaction.page';
import { ReceiptPage } from '../transaction/receipt/receipt.page';
import { ModalPage } from '../components/modal-page/modal-page.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ShareModule } from '../components/share.module';
@NgModule({
  imports: [
    Ng2SearchPipeModule,
    ShareModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TabsPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),

    NgCircleProgressModule.forRoot({
      // set defaults here,
      "backgroundGradient": true,
      "backgroundGradientStopColor": "#03f723",
      "backgroundColor": "#0051e6",
      units: "Pts",
      radius: 70,
      space: -6,
      toFixed : 2,      
      innerStrokeWidth: 8,
      animationDuration: 300,
      showInnerStroke:false,
      "subtitleColor" :"#222"
    }),
  ],
  declarations: [
    TabsPage,
    DashboardUserPage,
    DashboardGuestPage,
    PromotionPage,
    MyAccountPage,
    StorePage,
    PrivacyPolicyPage,
    ContactUsPage,
    TermsConditionPage,
    FaqPage,
    MyCardsPage,
    CardDetailsPage,
    ReplaceCardPage,
    ProfilePage,
    AboutUsPage,
    TransactionPage,
    ReceiptPage,
    ModalPage
  ]
})
export class TabsPageModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}