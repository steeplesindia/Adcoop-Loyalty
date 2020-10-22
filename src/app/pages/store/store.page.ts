import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { NgZone } from '@angular/core';
import { Base } from 'src/app/utils/base.class';
declare var google;
interface IgMarker {
  storeMarker: any;
  lat: any;
  long: any;
}

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})

export class StorePage extends Base implements OnInit {
 

  constructor(
    injector: Injector,
  ) {
    super(injector);
   
  }

  ngOnInit(){

  }
}
