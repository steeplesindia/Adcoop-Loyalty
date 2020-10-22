import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor(private storage: Storage) { }

  clearStorage() {
    this.storage.clear();
  }

  setPrivacyPolicy(data){
    this.storage.set('loyalty_privacy_policy', data); 
  }
  get privacyPolicy(){
    return this.storage.get('loyalty_privacy_policy'); 
  }

  setTermsNConditions(data){
    this.storage.set('loyalty_terms_conditions', data); 
  }
  get termsNConditions(){
    return this.storage.get('loyalty_terms_conditions'); 
  }
}