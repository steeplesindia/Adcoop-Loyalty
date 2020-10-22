
import { Component, OnInit, Injector } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Base } from 'src/app/utils/base.class';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage extends Base implements OnInit {
  loginForm: FormGroup;
  constructor(injector: Injector) {
    super(injector);

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('test@test.com', [Validators.required, Validators.email]),
      password: new FormControl('123', [Validators.required])
    });
  }

  loginSubmit(){
    this.authService.setAuthenticated(true);
    this.navigate("/tab")
  }

  mapToObj() {
    // this.loginModel.UserId = this.email;
    // this.loginModel.Password = this.password;
    // this.loginModel.LegalEntity = this.legalEntity;
  }

  get userId() { return this.loginForm.get('email').value; }
  get password() { return this.loginForm.get('password').value; }
}