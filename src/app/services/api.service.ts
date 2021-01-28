import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ContactUsModel } from '../utils/models/contact.model';
import { StorageService } from './storage.service';
import { CustomerModel } from '../utils/models/Customer.model';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private baseAddress = environment.url;
  public baseAddress;
  public imgAddress;

  private language$ = new Subject<String>();
  languageChange$ = this.language$.asObservable();

  language: any

  setLanguageChange(data) {
    this.translate.setDefaultLang(data);
    this.translate.use(data);
    this.language$.next(data);
  }

  constructor(public http: HttpClient, private translate: TranslateService) {
    this.baseAddress = environment.baseUrl;
    this.imgAddress = environment.imgUrl;

    this.languageChange$.subscribe((res: any) => {
      this.language = res;
      this.translate.setDefaultLang(res);
      this.translate.use(res);
      console.log(res)
    })
  }
  private postApiCall(url, body): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json'
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  getPolicyContext(): Observable<any> {
    let url = this.baseAddress + "api/app/GetPrivacyContent";
    let body = {
      Language: this.language
    };
    return this.postApiCall(url, body);
  }
  getTermsConditionContext() {
    console.log(this.baseAddress)
    this.http.get(this.baseAddress + "api/app/Test").subscribe(res => {
      console.log(res)
    }, error => {
      console.log(error)
    })
    let url = this.baseAddress + "api/app/GetTermsContent";
    console.log(url)
    let body = {
      Language: this.language
    };
    return this.postApiCall(url, body);
  }
  getPromotions(objectId): Observable<any> {
    let url = this.baseAddress + "api/app/GetEBrochure";
    let body;
    if (objectId == "") {
      body = {};
    } else {
      body = { ObjectId: objectId }
    }
    return this.postApiCall(url, body);
  }
  getSubjectList(): Observable<any> {
    let url = this.baseAddress + "api/app/getSubjectQuery";
    let body = {
      CultureLocale: this.language
    };
    return this.postApiCall(url, body);
  }

  sendMail(contactUs: ContactUsModel): Observable<any> {
    let url = this.baseAddress + "api/app/AddQueries";
    let body = {
      Name: contactUs.Name,
      Email: contactUs.Email,
      PhoneNo: contactUs.PhoneNo,
      Message: contactUs.Message,
      SubjectId: contactUs.SubjectId,
      Subject: contactUs.Subject,
      CultureLocale: this.language,
    };
    return this.postApiCall(url, body);
  }
  userLogin(email, password): Observable<any> {
    let url = this.baseAddress + "api/app/UserIdLogIn";
    let body = {
      EmailId: email,
      Password: password
    };
    return this.postApiCall(url, body);
  }

  getUserInfo(customerID): Observable<any> {
    let url = this.baseAddress + "api/app/UserInfo";
    let body = {
      Cust_Id: customerID
    };
    return this.postApiCall(url, body);
  }

  getCustomerSummary(customerID): Observable<any> {
    let url = this.baseAddress + "api/app/getCustomerSummary";
    let body = {
      CustId: customerID
    };
    return this.postApiCall(url, body);
  }


  replaceCard(custId, loc, reason): Observable<any> {
    let url = this.baseAddress + "api/app/BlockCard";
    let body = {
      "Cust_Id": custId,
      "collectionPoint": loc,
      "reasonCode": reason,
      "Locale": this.language
    };
    return this.postApiCall(url, body)
  }
  getStoresList(city, brand): Observable<any> {
    let url = this.baseAddress + "api/app/GetStoreDetail";
    var body;
    let lang = this.language;
    if (city == "" && brand == "") {
      body = {
        CurrentCulture: lang
      };
    } else if (city == "") {
      body = {
        "BrandName": brand,
        "CurrentCulture": lang
      };
    } else if (brand == "") {
      body = {
        "Emirates": city,
        "CurrentCulture": lang
      };
    } else {
      body = {
        "BrandName": brand,
        "Emirates": city,
        "CurrentCulture": lang
      };
    }
    return this.postApiCall(url, body)
  }

  getNationalities(): Observable<any> {
    let url = this.baseAddress + "api/app/GetNationalities";
    let body = {
      CountryId: 0,
      CurrentCulture: this.language
    };
    return this.postApiCall(url, body)
  }

  updateUser(userInfo: CustomerModel, custId): Observable<any> {
    let url = this.baseAddress + "api/app/UpdateUser";
    let body = {
      "CardType": userInfo.CardType,
      "CardNumber": userInfo.CardNumber,
      "FirstName": userInfo.FirstName,
      "LastName": userInfo.LastName,
      "Gender": userInfo.Gender,
      "DateOfBirth": userInfo.DateOfBirth,
      "Nationality": userInfo.Nationality,
      "MobileNo": userInfo.MobileNo,
      "Email": userInfo.Email,
      "Password": userInfo.Password,
      "Country": userInfo.Country,
      "City": userInfo.City,
      "Area": userInfo.Area,
      "Street": userInfo.Street,
      "HouseNo": userInfo.HouseNo,
      "Cust_Id": custId
    };
    return this.postApiCall(url, body)
  }

  getBrands(): Observable<any> {
    let url = this.baseAddress + "api/StoreDetails/GetBrands";
    let body = {
      CountryId: 0,
      "CurrentCulture": this.language
    };
    return this.postApiCall(url, body)
  }
  getEmirates(): Observable<any> {
    let url = this.baseAddress + "api/StoreDetails/GetEmiratesList";
    let body = {
      CountryId: 0,
      "CurrentCulture": this.language
    };
    return this.postApiCall(url, body)
  }

  getPrefix(): Observable<any> {
    let url = this.baseAddress + "api/app/GetPrefixCodes";
    return this.postApiCall(url, {})
  }

  getTransactionHeader(cardNo, fromDate, toDate): Observable<any> {
    let url = this.baseAddress + "api/ERP/TransactionViaCard";
    let body = {
      "cardNumber": cardNo,
      "validFromDate": fromDate,
      "validToDate": toDate
    }
    return this.postApiCall(url, body)
  }

  getTransactionDetails(storeId, cardNo, transactionId): Observable<any> {
    let url = this.baseAddress + "api/ERP/CardTransactionDetails";
    let body = {
      "storeId": storeId,
      "CardNumber": cardNo,
      "transactionId": transactionId
    }
    return this.postApiCall(url, body)
  }

  forgotPassword(email): Observable<any> {
    let url = this.baseAddress + "api/ERP/CardTransactionDetails";
    let body = {
      "Email": email,
      "Locale": this.language
    };
    return this.postApiCall(url, body)
  }

  getCardnumberStatus(cardNo): Observable<any> {
    let url = this.baseAddress + "api/CustomerMaster/RegisterUser";
    let body = {
      "CardNumber": cardNo
    };
    return this.postApiCall(url, body)
  }

  registerUser(userDetails): Observable<any> {
    let url = this.baseAddress + "api/CustomerMaster/RegisterUser";
    let body = {
      "cardType": userDetails.cardType,
      "CardNumber": userDetails.cardNumber,
      "firstName": userDetails.firstName,
      "lastName": userDetails.lastName,
      "gender": userDetails.gender,
      "dateOfBirth": userDetails.dateOfBirth,
      "nationality": userDetails.nationality,
      "mobileNo": userDetails.mobileNo,
      "landlineNo": userDetails.landlineNo,
      "email": userDetails.email,
      "address": userDetails.address,
      "Country": userDetails.Country,
      "street": userDetails.street,
      "city": userDetails.city,
      "area": userDetails.area,
      "houseNo": userDetails.houseNo,
      "Locale": userDetails.Locale,
      "ExtraMilesCheck": userDetails.ExtraMilesCheck
    };
    return this.postApiCall(url, body);
  }
}
