
import { Component, OnInit, Injector } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Base } from 'src/app/utils/base.class';
import { ModalPage } from '../components/modal-page/modal-page.page';
declare var anime: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage extends Base implements OnInit {
  loginForm: FormGroup;
  showSpinner: boolean;
  showPass:boolean = false
  constructor(injector: Injector) {
    super(injector);

  }
  animateText() {
    anime.timeline({ loop: false }).add({
      targets: '.ml5 .line',
      opacity: [0.5, 1],
      scaleX: [0, 1],
      easing: "easeInOutExpo",
      duration: 1000
    }).add({
      targets: '.ml5 .line',
      duration: 800,
      easing: "easeOutExpo",
      translateY: (el, i) => (-0.625 + 0.625 * 2 * i) + "em"
    }).add({
      targets: '.ml5 .ampersand',
      opacity: [0, 1],
      scaleY: [0.5, 1],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=600'
    }).add({
      targets: '.ml5 .letters-left',
      opacity: [0, 1],
      translateX: ["0.5em", 0],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=300'
    }).add({
      targets: '.ml5 .letters-right',
      opacity: [0, 1],
      translateX: ["-0.5em", 0],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=600'
    }).add({
      targets: '.ml5',
      opacity: 1,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });
    var textWrapper = document.querySelector('.ml3') as HTMLElement;
    textWrapper.style.opacity = "0";
    setTimeout(() => {
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      textWrapper.style.opacity = "1";
      anime.timeline({
        loop: false,
        complete: function (anim) {
          document.getElementById("welcomeTxt").style.opacity = "1";
        }
      })
        .add({
          targets: '.ml3 .letter',
          opacity: [0, 1],
          easing: "easeInOutQuad",
          duration: 2250,
          delay: (el, i) => 150 * (i + 1)
        }).add({
          targets: '.ml3',
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 1000
        })
    }, 2000);
  }
  ngOnInit() {
    this.animateText();
    this.loginForm = new FormGroup({
      email: new FormControl('faisal.bukhari@alfazance.com', [Validators.required, Validators.email]),
      password: new FormControl('pass@word1', [Validators.required])
    });
  }

  loginSubmit() {
    this.showSpinner = true;
    this.apiService.userLogin(this.userId, this.password).subscribe(res => {
      if (res.length != 0) {
        this.storageService.setCustomerEmail(this.userId);
        this.storageService.setCustomerId(res[0].Customer_Id);
        this.authService.setAuthenticated(true);
        this.showSpinner = false;
        this.navigate("/tab")
      } else {
        this.showSpinner = false;
        this.showToast("Invalid Credentials")
      }
      console.log(res);
    }, error => {
      this.showSpinner = false;
      this.showToast("Connection Error")
    })
  }

  get userId() { return this.loginForm.get('email').value; }
  get password() { return this.loginForm.get('password').value; }

  forgotPassword() {
    this.openModal(ModalPage, "Forgot Password", { email: '' }, "forgotPass").then()
  }
}