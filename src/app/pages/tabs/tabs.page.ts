import { Component, OnInit, Injector } from '@angular/core';
import { Base } from 'src/app/utils/base.class';
declare var $: any;
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage extends Base implements OnInit {
  authenticated: boolean;

  constructor(injector: Injector) {
    super(injector);
    
  }
  ngOnInit() {
    this.authService.authChange$.subscribe(res=>{
      console.log(res)
      this.authenticated = res
    })
  }

  myAccount() {
    this.navigate('tab/tabs/my-account')
  }

  gotoCard() {
    var fabBtn = document.querySelector(".fabBtn");
    fabBtn.classList.add("active");
    this.navigate('/tabs/my-cards')
  }
}
