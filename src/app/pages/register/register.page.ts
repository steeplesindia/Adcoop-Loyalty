
import { Component, OnInit, Injector } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base } from 'src/app/utils/base.class';
import { CustomerModel } from 'src/app/utils/models/Customer.model';
import { NationalityModel } from 'src/app/utils/models/Nationality.model';
import { RegisterUserModel } from 'src/app/utils/models/Register-user.model';
import { ModalPage } from '../components/modal-page/modal-page.page';
declare var anime: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage extends Base implements OnInit {
  prefixList: any = [];
  nationalityList: NationalityModel;
  registerForm: FormGroup;
  showCard: boolean = false;
  segment="personal"
  constructor(injector: Injector, private barcodeScanner: BarcodeScanner) {
    super(injector);
  }
  ngOnInit() {
    this.registerForm = new FormGroup({
      cardNo: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      prefix: new FormControl('', [Validators.required]),
      mobileNo: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      uaeResident:new FormControl('', [Validators.required]),
      city:new FormControl('', [Validators.required]),
      area:new FormControl('', [Validators.required]),
      street:new FormControl('', [Validators.required]),
      house:new FormControl('', [Validators.required]),
    });
    this.getPrefixCall();
    this.nationalitiesServiceCall();
  }
  barcodeScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      if (barcodeData.text != "") {
        this.validateCard(this.cardNumber)
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  nationalitiesServiceCall() {
    this.storageService.countries.then(res => {
      if (res) {
        this.nationalityList = res;
      }
    })
    this.apiService.getNationalities().subscribe(res => {
      this.nationalityList = res;
      this.storageService.setCountries(res);
    })
  }
  getPrefixCall() {
    this.apiService.getPrefix().subscribe(res => {
      this.prefixList = res;
    })
  }

  validateCard(cardNo?) {
    if (!cardNo) cardNo = this.cardNumber;
    this.apiService.getCardnumberStatus(cardNo).subscribe(res => {
      console.log(res);
      this.showCard = this.cardStatus(res);
    }, error => {
      this.showCard = true;
      console.log(error);
    }
    )
  }

  cardStatus(res) {
    let result = Number(res);
    if (result == -6) {
      this.showToast("This card number is already registered");
      return false;
    } else if (result == -5) {
      this.showToast("Entered card is not a valid card number");
      return false;
    } else if (result == -2) {
      this.showToast("Entered card number is not a primary card");
      return false;
    } else {
      return true;
    }
  }
  register(){
    let userDetails: RegisterUserModel = {} as RegisterUserModel;
    userDetails.cardType = 1;
    userDetails.ExtraMilesCheck = 1;

    userDetails.cardNumber = this.cardNumber;
    userDetails.firstName = this.firstName;
    userDetails.lastName = this.lastName;
    userDetails.gender = this.gender;
    userDetails.nationality = this.nationality;
    userDetails.dateOfBirth = new Date(this.dob);
    userDetails.mobileNo = this.prefix + "" + this.mobileNo;
    userDetails.email = this.email;
    userDetails.Country = this.uaeResident;
    userDetails.city = this.city;
    userDetails.area = this.area;
    userDetails.street = this.street;
    userDetails.houseNo = this.house;

    this.presentLoading();

    this.apiService.registerUser(userDetails).subscribe(res=>{
      this.dismissLoading();
      console.log(res);
      this.registrationStatus(res);
    },error=>{
      this.dismissLoading();
    })
  }
  registrationStatus(res) {
    let result = Number(res);
    if (result == -3) {
      this.showToast("This email address is already registered");
      return false;
    }
    return true;
  }
  get cardNumber() { return this.registerForm.get('cardNo').value; }
  get firstName() { return this.registerForm.get('firstName').value; }
  get lastName() { return this.registerForm.get('lastName').value; }
  get gender() { return this.registerForm.get('gender').value; }
  get nationality() { return this.registerForm.get('nationality').value; }
  get dob() { return this.registerForm.get('dob').value; }
  get prefix() { return this.registerForm.get('prefix').value; }
  get mobileNo() { return this.registerForm.get('mobileNo').value; }
  get email() { return this.registerForm.get('email').value; }
  get uaeResident() { return this.registerForm.get('uaeResident').value; }
  get city() { return this.registerForm.get('city').value; }
  get area() { return this.registerForm.get('area').value; }
  get street() { return this.registerForm.get('street').value; }
  get house() { return this.registerForm.get('house').value; }
}
