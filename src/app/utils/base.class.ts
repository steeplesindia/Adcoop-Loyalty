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
import { TranslateService } from '@ngx-translate/core';
export class Base {

  private _apiService: ApiService
  private _storage: StorageService;
  private _router: Router;
  private _alertService: AlertService;
  private location: Location;
  private _authService: AuthGuardService;
  private _sanitizer: DomSanitizer;
  private loadingController: LoadingController;
  private loading;
  protected translate: TranslateService;

  private toastCtrl: ToastController;
  public menuCtrl: MenuController;
  public popoverCtrl: ModalController;
  public colorList: any[];


  constructor(injector: Injector) {
    this.translate = injector.get(TranslateService);
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
    this.loadingController = injector.get(LoadingController);
    this.colorList = [];
    this.colorList.push("linear-gradient(90deg, #f12525, #347fdc)");
    this.colorList.push("linear-gradient(90deg,#03f723,#0051e6)");
  }
  getTrans(key: string | string[]) {
    return this.translate.get(key).toPromise();
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

  enableSideMenu = (value) => this.menuCtrl.enable(value)

  openSideMenu = () => this.menuCtrl.open()

  closeSideMenu = () => this.menuCtrl.close()

  logout() {
    this.getTrans("logoutHeader").then(header => {
      this.getTrans("logoutMsg").then(msg => {
        this.alertCtrl.AlertConfirmation(header, msg).subscribe(res => {
          if (res) {
            this._authService.setAuthenticated(false);
            this.storageService.clearStorage();
            this.navigate("login");
          }
        })
      })
    })
  }

  public goback(isBack) {
    if (isBack)
      this.location.back();
  }

  public goHome = () => this.navigate('/');

  public goLogin = () => this.navigate("login");

  public sanitizeUrl = (url) => this._sanitizer.bypassSecurityTrustResourceUrl(url);

  public cardType(type) {
    if (type == 1) {
      return "Primary Card";
    } else {
      return "Secondary Card";
    }
  }

  cardNumberDisplay(data) {
    if (data)
      return data.toString().replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }

  async openModal(componentName, title, data?, type?, extraData?) {
    return new Promise(async (resolve, reject) => {
      const modal = await this.popoverCtrl.create({
        component: componentName,
        componentProps: {
          "title": title,
          "value": data,
          "type": type,
          "extraData": extraData
        }
      });
      modal.onDidDismiss().then((res) => {
        if (res.data && res.data != {}) {
          resolve(res.data);
        }
      })
      await modal.present();
    })
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await this.loading.present();
  }

  dismissLoading = () => this.loading.dismiss();

  getErrorMessage(form) {
    if (form.hasError('required'))
      return 'This field is required';
    else if (form.hasError('email'))
      return 'Invalid Email format';
  }
}