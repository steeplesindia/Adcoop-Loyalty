import { ApiService } from '../services/api.service';
import { Injector } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastController, MenuController, AlertController, LoadingController, ModalController, PopoverController, ActionSheetController } from '@ionic/angular';
import { Observable, from } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Location } from '@angular/common';
import { AuthGuardService } from '../services/auth-guard.service';
import { DomSanitizer } from '@angular/platform-browser';
export class Base {

  private _apiService: ApiService
  private _storage: StorageService;
  private _router: Router;
  private _alertService: AlertService;
  private location: Location;
  private _authService: AuthGuardService;
  private _sanitizer: DomSanitizer;

  private toastCtrl: ToastController;
  public menuCtrl: MenuController;
  public popoverCtrl: ModalController;


  constructor(injector: Injector) {
    this._apiService = injector.get(ApiService);
    this._storage = injector.get(StorageService);
    this._router = injector.get(Router);
    this.toastCtrl = injector.get(ToastController);
    this.menuCtrl = injector.get(MenuController);
    this._alertService = injector.get(AlertService);
    this.popoverCtrl = injector.get(ModalController);
    this.location = injector.get(Location);
    this._authService = injector.get(AuthGuardService);
    this._sanitizer = injector.get(DomSanitizer);
  }

  get alertCtrl() { return this._alertService; }
  get apiService() { return this._apiService; }
  get storageService() { return this._storage }
  get router() { return this._router }
  get authService() { return this._authService }

  navigate(url) {
    this.router.navigateByUrl(url);
  }

  async showToast(message) {
    return this._alertService.presentToast(message);
  }

  enableSideMenu(value) {
    this.menuCtrl.enable(value);
  }
  openSideMenu() {
    this.menuCtrl.open();
  }
  closeSideMenu() {
    this.menuCtrl.close();
  }

  logout() {
    this.alertCtrl.AlertConfirmation("Logout", "Are you sure you want to logout?").subscribe(res => {
      if (res) {
        this._authService.setAuthenticated(false);
        this.navigate("login");
      }
    })
  }

  public goback(isBack) {
    if (isBack)
      this.location.back();
  }

  public goHome = () => this.navigate('/');

  public goLogin = () => this.navigate("login");

  public sanitizeUrl = (url) => this._sanitizer.bypassSecurityTrustResourceUrl(url)

}