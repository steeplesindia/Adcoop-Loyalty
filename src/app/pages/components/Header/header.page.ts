import { Component, OnInit, ViewChild, Injector, Input } from '@angular/core';
import { NavController, IonSlides, AlertController } from '@ionic/angular';
import { Base } from 'src/app/utils/base.class';

@Component({
  selector: 'header-page',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage extends Base implements OnInit {
  @Input('backbutton') backbutton:boolean;
  @Input('title') title:String;
  
  constructor(injector:Injector){
    super(injector);
  }

  ngOnInit(){

  }
}
