import { NavParams } from '@ionic/angular';
import { Component, OnInit, Injector } from '@angular/core';
import { Base } from 'src/app/utils/base.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from 'src/app/utils/enums/filter.option.enum';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPage extends Base implements OnInit {

  data: any;
  type: any;
  title: any;

  forgotPassForm: FormGroup;
  showLoading: boolean;

  transactionfilterOptions;

  brandList: any;
  cityList: any;
  constructor(injector: Injector, private navParams: NavParams) {
    super(injector);
  }
  ngOnInit() {
    this.title = this.navParams.get('title');
    this.type = this.navParams.get('type');
    this.data = this.navParams.get('value');

    if (this.type == "forgotPass") {
      this.forgotPassForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
      });
    } else if (this.type == 'transactionFilter') {
      this.setTransactionFilterOptions();
    } else if (this.type == 'storeFilter') {
      let extraParam = this.navParams.get('extraData');
      this.brandList = extraParam.brands;
      this.cityList = extraParam.city;
    }
  }
  close = (data) => this.popoverCtrl.dismiss(data);

  forgetPassword() {
    this.showLoading = true;
    this.apiService.forgotPassword(this.email).subscribe(res => {
      this.showLoading = false;
      if (res == -3) {
        this.showToast("Please enter valid email address");
      } else {
        this.showToast("Password Link sent to your mail");
        this.close(null);
      }
    }, error => {
      this.showLoading = false;
      this.showToast("Connection Error");
    })
  }

  setTransactionFilterOptions() {
    this.transactionfilterOptions = [
      { id: FilterOptions.lastWeek, name: "Last Week" },
      { id: FilterOptions.lastMonth, name: "Last Month" },
      { id: FilterOptions.last3Months, name: "Last 3 Months" },
      { id: FilterOptions.last6Months, name: "Last 6 Months" },
      { id: FilterOptions.lastYear, name: "Last Year" },
    ]
  }
  dateOptionSelected(ev) {
    let id = ev.detail.value;
    this.genarateDate(id);
  }
  dateChanged() {
    if (this.data.startDate && this.data.endDate)
      this.close(this.data);
  }
  genarateDate(i) {
    var startDate, endDate;
    if (i == FilterOptions.lastWeek) {
      let current = new Date();
      let weekstart = current.getDate() - current.getDay();
      let weekend = weekstart + 6;

      startDate = new Date(current.setDate(weekstart));
      endDate = new Date(current.setDate(weekend));

    } else if (i == FilterOptions.lastMonth) {
      let date = new Date();
      startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      endDate = date;
    } else if (i == FilterOptions.last3Months) {
      let date = new Date();
      startDate = new Date(date.getFullYear(), date.getMonth() - 3, date.getDate());
      endDate = date
    } else if (i == FilterOptions.last6Months) {
      let date = new Date();
      startDate = new Date(date.getFullYear(), date.getMonth() - 6, date.getDate());
      endDate = date
    } else if (i == FilterOptions.lastYear) {
      let date = new Date();
      startDate = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
      endDate = date
    }

    this.data.startDate = startDate;
    this.data.endDate = endDate;

    this.close(this.data);
  }

  submitStoreFilter() {
    this.close(this.data)
  }
  get email() { return this.forgotPassForm.get('email').value; }
  get today() { return new Date().toJSON().split('T')[0]; }
}
