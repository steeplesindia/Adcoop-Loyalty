import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { NavController, IonSlides, AlertController } from '@ionic/angular';
import { Base } from 'src/app/utils/base.class';

@Component({
  selector: 'dashboard-user',
  templateUrl: './dashboard-user.page.html',
  styleUrls: ['./dashboard-user.page.scss'],
})
export class DashboardUserPage extends Base implements OnInit {

  @ViewChild('slides', { static: true }) slides: IonSlides
  truncating0 = true;
  truncating1 = true;
  truncating2 = true;
  truncating3 = true;

  coupons: any = 0;

  cardExists: boolean;

  headerSlider = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };


  authenticated: boolean;
  constructor(injector: Injector) {
    super(injector);
    //this.authenticated = this.dataSPYService.authenticated;
  }


  // getButtonList() {
  //   this.apiService.getComponentButton().subscribe(res => {
  //     this.buttonList = res;
  //     console.log(res);
  //   })
  // }

  // navigate(button: ComponentButtonModel) {
  //   if (button.InternalLink) {
  //     this.navigateToRelative(button.Link);
  //   } else {
  //     this.openUrl(button.Link);
  //   }
  // }
  ngOnInit(){

  }
  // ngOnInit() {

  //   console.log("Dashboard")
  //   this.getButtonList();
  //   this.authenticated = this.dataSPYService.authenticated;
  //   this.getCarouselList();

  //   if (this.authenticated) {
  //     this.customerDetails = this.dataSPYService.customer;
  //     if (this.customerDetails) {
  //       if (this.customerDetails.LoyaltyCard && this.customerDetails.LoyaltyCard.LoyaltyCardNumber) {
  //         this.cardDetails = this.customerDetails.LoyaltyCard;
  //         this.cardExists = true;
  //       }
  //     }
  //     this.getCustomerData();
  //   }
  // }

  // addPlayerId() {
  //   var playerId = this.dataSPYService.playerId;
  //   var custId = this.customerDetails.CustomerId;
  //   var mobile = this.dataSPYService.mobileNo;
  //   var card = this.dataSPYService.customer.LoyaltyCard.LoyaltyCardNumber || null;
  //   this.apiService.addPlayerId(playerId, custId, mobile, card).subscribe(res => {
  //     console.log(res);
  //   }, error => {
  //     console.log(error);
  //   })
  // }

  // getCarouselList() {
  //   this.apiService.getCarouselList().subscribe(res => {
  //     console.log(res);
  //     this.carouselList = res;
  //   })

  // }
  // getoMyCards() {
  //   this.navigateToRelative('/tabs/my-cards');
  // }
  // getCustomerData() {
  //   this.apiService.getCustomerDetails().subscribe(res => {
  //     this.customerDetails = res;
  //     console.log(res);
  //     this.storageService.setCustomer(this.customerDetails);
  //     this.addPlayerId();
  //     if (this.customerDetails.LoyaltyCard.LoyaltyCardNumber) {
  //       this.cardDetails = this.customerDetails.LoyaltyCard
  //       this.cardExists = true;
  //     }
  //     this.checkMandetoryField();
  //   })
  // }

  // checkMandetoryField() {
  //   if (
  //     !this.customerDetails.FirstName || !this.customerDetails.LastName || !this.customerDetails.NationalId ||
  //     !this.customerDetails.Nationality || !this.customerDetails.PreferredStoreId || !this.customerDetails.Gender ||
  //     !this.customerDetails.Address.Country || !this.customerDetails.Address.City
  //   ) {

  //     this.alertCtrl.AlertMessage("Information", "Few mandetory details are missing").subscribe(res => {
  //       if (res) {
  //         this.navigateToRelative("/tabs/my-account/profile");
  //       }
  //     })
  //   }
  // }
  // doRefresh(event) {
  //   if (this.authenticated) {
  //     this.apiService.getCustomerDetails().subscribe(res => {
  //       console.log(res);
  //       this.customerDetails = res;
  //       this.storageService.setCustomer(this.customerDetails);
  //       this.dataSPYService.customer = this.customerDetails;
  //       this.addPlayerId();
  //     });
  //   }
  //   this.getButtonList();
  //   this.getCarouselList();
  //   setTimeout(() => {
  //     event.target.complete();
  //   }, 2000);
  // }

  // addFirstCard() {
  //   this.navigateToRelative('/tabs/scan-card');
  // }
  // cardNumberDisplay() {
  //   if (this.cardDetails.LoyaltyCardNumber)
  //     return this.cardDetails.LoyaltyCardNumber.toString().replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
  // }


  // gotoTransactions() {
  //   this.navigateToRelative('/tabs/my-account/transaction');
  // }

  // goToSignUp() {
  //   this.navigateToRelative('/login');
  // }
  // goToAbout() {
  //   this.navigateToRelative('/tabs/about');
  // }
  // gotoProfile() {
  //   this.navigateToRelative('/tabs/my-account/profile');
  // }

  // openPage(socialMedia: SocialMediaModel) {
  //   if (socialMedia.Url) this.openUrl(socialMedia.Url);

  // }


  // openCarouselPage(link) {
  //   if (link) this.openUrl(link);
  // }
}
