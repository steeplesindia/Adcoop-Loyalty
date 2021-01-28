import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AboutUsPage } from '../about-us/about-us.page';
import { ContactUsPage } from '../contact-us/contact-us.page';
import { DashboardGuestPage } from '../dashboard-guest/dashboard-guest.page';
import { DashboardUserPage } from '../dashboard-user/dashboard-user.page';
import { FaqPage } from '../faq/faq.page';
import { MyAccountPage } from '../my-account/my-account.page';
import { MyCardsPage } from '../my-cards/my-cards.page';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy.page';
import { ProfilePage } from '../profile/profile.page';
import { PromotionPage } from '../promotion/promotion.page';
import { ReplaceCardPage } from '../replace-card/replace-card.page';
import { StorePage } from '../store/store.page';
import { TermsConditionPage } from '../terms-condition/terms-condition.page';
import { TransactionPage } from '../transaction/transaction.page';
import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard-user',
        component: DashboardUserPage,
       
      },
      {
        path: 'dashboard-guest',
        component: DashboardGuestPage
      },
      {
        path: 'promotion',
        component: PromotionPage
      },
      {
        path: 'store',
        component: StorePage
      },
      {
        path: 'my-cards',
        component: MyCardsPage,
         canActivate: [AuthGuardService]
      },
      {
        path: 'transaction',
        component: TransactionPage
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
        component: PrivacyPolicyPage
      },
      {
        path: 'contact',
        component: ContactUsPage
      },
      {
        path: 'terms',
        component: TermsConditionPage
      },
      {
        path: 'faq',
        component: FaqPage
      },
      {
        path: 'replace-card',
        component: ReplaceCardPage
      },
      {
        path: 'profile',
        component: ProfilePage
      },
      {
        path: 'about',
        component: AboutUsPage
      },
      {
        path: 'my-account',
        component: MyAccountPage,
        children: [
          {
            path: 'interest',
            loadChildren: '../interest/interest.module#InterestPageModule'
          },
          {
            path: 'transaction',
            loadChildren: '../transaction/transaction.module#TransactionPageModule'
          },
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/my-cards',
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
