import { Component, OnInit, Injector } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Base } from 'src/app/utils/base.class';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage extends Base implements OnInit {

  authenticated: boolean;

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    this.authService.authChange$.subscribe(res => this.authenticated = res)
  }

  navigatePage(url){
    this.navigate(url)
  }
}
