import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {

  private _authChanged$ = new BehaviorSubject<boolean>(false);
  authChange$ = this._authChanged$.asObservable();

  
  constructor(private router:Router,private storage: Storage) {
    
  }
  setAuthenticated(auth) { 
    this._authChanged$.next(auth);
    this.storage.set('authenticated', auth); 
  }
  get authenticated() { 
    return this.storage.get('authenticated');
   }

  canActivate(): Promise<boolean> | boolean {
    return this.authenticated.then(res => {
      if(res){
        this.setAuthenticated(true);
        return true;
      }else{
        this.router.navigateByUrl('login');
        return false;
      }
    })
  }
}
