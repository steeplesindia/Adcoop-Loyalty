import { LoadingController } from '@ionic/angular';
import { Component, Injector, OnInit } from '@angular/core';
import { Base } from 'src/app/utils/base.class';
import { NationalityModel } from 'src/app/utils/models/Nationality.model';
import { CustomerModel } from 'src/app/utils/models/Customer.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage extends Base implements OnInit {
 
  toggleDetails: any;
  status: string = 'profile';
  startDate: Date;
  endDate: Date;
  prefixList: any = [];

  userInfo: CustomerModel = {} as CustomerModel;
  nationality: NationalityModel;

  prefix: any;
  mobileNo: any;
  gender: any[] = [];

  custId: any;
  constructor(injector: Injector) {
    super(injector);
   
    this.gender = [
      { id: 1, value: 'Male' },
      { id: 2, value: 'Female' }
    ]
  }
  ngOnInit() {
    this.storageService.customerId.then(res => {
      if (res) {
        this.custId = res;
        this.getUserInfoServiceCall();
      }
    })
   
    this.getPrefixCall();
    this.nationalitiesServiceCall();
  }

  async getUserInfoServiceCall() {

    this.apiService.getUserInfo(this.custId).subscribe(
      res => {
        this.userInfo = res[0];
        this.prefix = this.userInfo.MobileNo.toString().substr(0, 2);
        console.clear();
        this.userInfo.prefix = this.prefix;
        this.userInfo.MobileNo = this.userInfo.MobileNo.toString().substr(2, 7);
        console.log(this.userInfo)
      }, error => {
        this.showToast("Connection Error");
      }
    )
    this.apiService.getCustomerSummary(this.custId).subscribe(
      res => {
        Object.keys(res).map(el => {
          if (res[el].Card_Type == 1) {
            this.userInfo.CardNumber = res[el].CardNumber;
          }
        })
      })
  }

  nationalitiesServiceCall() {
    this.storageService.countries.then(res => {
      if (res) {
        this.nationality = res;
      }
    })
    this.apiService.getNationalities().subscribe(res => {
      this.nationality = res;
      this.storageService.setCountries(res);
    })
  }
  getPrefixCall() {
    this.apiService.getPrefix().subscribe(res => {
      this.prefixList = res;
    })
  }
  async updateDetails() {
    this.userInfo.MobileNo = this.userInfo.prefix + "" + this.userInfo.MobileNo;
    this.apiService.updateUser(this.userInfo, this.custId).subscribe(res => {
      console.log(res)
      this.showToast("Details updated successfully");
    }, error => {
      this.showToast("Connection Error");
    })
  }
  async confirmAlert() {
    this.alertCtrl.AlertConfirmation("Update Details", "Are you sure you want to update details?").subscribe(res => {
      if (res) {
        this.updateDetails()
      }
    })
  }
}
