import { Injectable } from '@angular/core';
import { ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { Observable, from, Subscription } from 'rxjs';
import { promise } from 'protractor';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController, 
    private toastController: ToastController,
    private actionSheet: ActionSheetController,
    private translate:TranslateService,
    private apiServ:ApiService
    ) { }

  AlertConfirmation(headerTxt, msg): Observable<any> {
    var self = this;
    return from(
      new Promise(function (resolve, reject) {
        self.translate.setDefaultLang(self.apiServ.language);
        self.translate.get("no").subscribe(no=>{
          self.translate.get("yes").subscribe(async (yes) =>{
            const alert = await self.alertController.create({
              header: headerTxt,
              message: msg,
              buttons: [
                {
                  text: no,
                  role: 'cancel',
                  handler: () => {
                    resolve(false);
                  }
                },
                {
                  text: yes,
                  handler: () => {
                    resolve(true)
                  }
                },
              ]
            });
            alert.present();
          });
        });
      })
    )
  }

  AlertMessage(headerTxt, msg): Subscription {
    var self = this;
    return from(
      new Promise(async function (resolve, reject) {
        const alert = await self.alertController.create({
          header: headerTxt,
          message: msg,
          buttons: ["OK"]
        });
    
        await alert.present();
      })
    ).subscribe(res=>{})
  }

  AlertWithInput(headerTxt, msg,inputArr): Observable<any> {
    var self = this;
    return from(
      new Promise(async function (resolve, reject) {
        const alert = await self.alertController.create({
          header: headerTxt,
          message: msg,
          inputs:inputArr,
          buttons: [
            {
              text: 'Ok',
              handler: (data) => {
                resolve(data)
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: (blah) => {
                resolve(false);
              }
            }
          ]
        });
        alert.present();
      })
    ) 
  }

  async presentToast(message) {

    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'tabs-bottom',
      buttons: [{
        text: "X",
        role: 'cancel',
      }]
    });

    return await toast.present();
  }
}

