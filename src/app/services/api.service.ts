import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ContactUsModel } from '../utils/models/contact.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private baseAddress = environment.url;
  public baseAddress;
  public imgAddress;

  constructor(public http: HttpClient) {
    this.baseAddress = environment.baseUrl;
    this.imgAddress = environment.imgUrl;
  }

  private postApiCall(url, body): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json'
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  getPolicyContext(lang): Observable<any> {
    let url = this.baseAddress + "GetPrivacyContent";
    let body = {
      Language: lang
    };
    return this.postApiCall(url, body);
  }
  getTermsConditionContext(lang) {
    console.log(this.baseAddress)
    this.http.get("http://192.168.0.118:8043/api/app/Test").subscribe(res=>{
      console.log(res)
    },error=>{
      console.log(error)
    })

    let url = this.baseAddress + "GetTermsContent";
    console.log(url)
    let body = {
      Language: lang
    };
    return this.postApiCall(url, body);
  }
  getPromotions(objectId): Observable<any> {
    let url = this.baseAddress + "GetEBrochure";
    let body;
    if (objectId == "") {
      body = {};
    } else {
      body = { ObjectId: objectId }
    }
    return this.postApiCall(url, body);
  }
  getSubjectList(lang): Observable<any> {
    let url = this.baseAddress + "getSubjectQuery";
    let body = {
      CultureLocale: lang
    };
    return this.postApiCall(url, body);
  }

  sendMail(contactUs: ContactUsModel, lang): Observable<any> {
    let url = this.baseAddress + "AddQueries";
    let body = {
      Name: contactUs.Name,
      Email: contactUs.Email,
      PhoneNo: contactUs.PhoneNo,
      Message: contactUs.Message,
      SubjectId: contactUs.SubjectId,
      Subject: contactUs.Subject,
      CultureLocale: lang,
    };
    return this.postApiCall(url, body);
  }
}
