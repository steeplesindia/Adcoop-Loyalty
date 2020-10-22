import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ContactUsPage } from '../contact-us/contact-us.page';
import { DashboardGuestPage } from '../dashboard-guest/dashboard-guest.page';
import { DashboardUserPage } from '../dashboard-user/dashboard-user.page';
import { FaqPage } from '../faq/faq.page';
import { MyAccountPage } from '../my-account/my-account.page';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { PromotionPage } from '../promotion/promotion.page';
import { StorePage } from '../store/store.page';
import { TermsConditionPage } from '../terms-condition/terms-condition.page';
import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard-user',
        component:DashboardUserPage,
        canActivate: [AuthGuardService]
      },
      {
        path: 'dashboard-guest',
        component:DashboardGuestPage
      },
      {
        path: 'promotion',
        component:PromotionPage
      },
      {
        path: 'store',
        component:StorePage
      },
      {
        path: 'my-cards',
        children: [
          {
            path: '',
            loadChildren: '../my-cards/my-cards.module#MyCardsPageModule'
          }
        ]
      },
      { 
        path: 'social-media', 
        loadChildren: '../social-media/social-media.module#SocialMediaPageModule' 
      },
      {
        path: 'weekly-offer',
        children: [
          {
            path: '',
            loadChildren: '../weekly-offer/weekly-offer.module#WeeklyOfferPageModule'
          }
        ]
      },
      {
        path: 'coupon',
        children: [
          {
            path: '',
            loadChildren: '../coupon/coupon.module#CouponPageModule'
          }
        ]
      },
      {
        path: 'privacy',
        component:PrivacyPolicyPage
      },
      {
        path: 'contact',
        component:ContactUsPage
      },
      {
        path: 'terms',
        component:TermsConditionPage
      },
      {
        path: 'faq',
        component:FaqPage
      },
      {
        path: 'my-account',
        component:MyAccountPage,
        children: [
          {
            path: 'replace-card',
            loadChildren: '../replace-card/replace-card.module#ReplaceCardPageModule'
          },
          {
            path: 'interest',
            loadChildren: '../interest/interest.module#InterestPageModule'
          },
          {
            path: 'about',
            loadChildren: '../about/about.module#AboutPageModule'
          },
          {
            path: 'profile',
            loadChildren: '../edit-profile/edit-profile.module#EditProfilePageModule'
          },
         
          {
            path: 'transaction',
            loadChildren: '../transaction/transaction.module#TransactionPageModule'
          },
          {
            path: 'corporate-purchase',
            loadChildren: '../corporate-purchase/corporate-purchase.module#CorporatePurchasePageModule'
          },
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/dashboard-user',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
