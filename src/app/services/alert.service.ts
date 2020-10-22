import { Injectable } from '@angular/core';
import { ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { Observable, from, Subscription } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController, 
    private toastController: ToastController,
    private actionSheet: ActionSheetController
    ) { }

  AlertConfirmation(headerTxt, msg): Observable<any> {
    var self = this;
    return from(
      new Promise(async function (resolve, reject) {
        const alert = await self.alertController.create({
          header: headerTxt,
          message: msg,
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: (blah) => {
                resolve(false);
              }
            },
            {
              text: 'Yes',
              handler: () => {
                resolve(true)
              }
            },
          ]
        });
        alert.present();
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
