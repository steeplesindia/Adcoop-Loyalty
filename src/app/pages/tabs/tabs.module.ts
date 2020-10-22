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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
    DashboardUserPage,
    DashboardGuestPage,
    HeaderPage,
    PromotionPage,
    MyAccountPage,
    StorePage,
    PrivacyPolicyPage,
    ContactUsPage,
    TermsConditionPage,
    FaqPage
  ]
})
export class TabsPageModule {}
