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

  setPromotions(data){
    this.storage.set('loyalty_promotions', data); 
  }
  get promotions(){
    return this.storage.get('loyalty_promotions'); 
  }

  setCustomerId(data){
    this.storage.set('loyalty_customer_id', data); 
  }
  get customerId(){
    return this.storage.get('loyalty_customer_id'); 
  }
  setCustomerEmail(data){
    this.storage.set('loyalty_customer_email', data); 
  }
  get customerEmail(){
    return this.storage.get('loyalty_customer_email'); 
  }

  setCustomerCardDetails(data){
    this.storage.set('loyalty_customer_cards', data); 
  }
  get customerCards(){
    return this.storage.get('loyalty_customer_cards'); 
  }
  setStores(data){
    this.storage.set('loyalty_stores', data); 
  }
  get stores(){
    return this.storage.get('loyalty_stores'); 
  }

  setCountries(data){
    this.storage.set('loyalty_country', data); 
  }
  get countries(){
    return this.storage.get('loyalty_country'); 
  }

  setLanguage(data){
    this.storage.set('loyalty_language', data); 
  }
  get language(){
    return this.storage.get('loyalty_language'); 
  }
}