import { LoadingController, ToastController } from '@ionic/angular';
import { Component, Injector, OnInit } from '@angular/core';
import { ContactUsModel } from 'src/app/utils/models/contact.model';
import { Base } from 'src/app/utils/base.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage extends Base implements OnInit {
  subjectList: any = [];
  selectedSubject: any = {};

  contactUsForm: FormGroup;

  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit() {
    this.contactUsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNo: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });

    this.getSubjectQryServiceCall();
  }
  getSubjectQryServiceCall() {
    this.apiService.getSubjectList().subscribe(res => {
      this.subjectList = res;
    }, error => {

    })
  }
  async sendMsg() {
    console.log(this.mapToObj())
    this.apiService.sendMail(this.mapToObj()).subscribe(
      res => {
        this.showToast("Thank you for submitting your enquiry,we will revert shortly");
        this.contactUsForm.reset();
      }, error => {
        this.showToast("Connection Error");
      })
  }

  getErrorMessage(form) {
    if (form.hasError('required'))
      return 'This field is required';
    else if (form.hasError('email'))
      return 'Invalid Email format';
  }
  mapToObj() {
    let contact = {} as ContactUsModel;
    contact.Name = this.name;
    contact.Email = this.email;
    contact.PhoneNo = this.phoneNo;
    contact.Subject = this.subject.Subject;
    contact.SubjectId = this.subject.ObjectId;
    contact.Message = this.message;

    return contact;
  }

  get name() { return this.contactUsForm.get('name').value; }
  get email() { return this.contactUsForm.get('email').value; }
  get phoneNo() { return this.contactUsForm.get('phoneNo').value; }
  get subject() { return this.contactUsForm.get('subject').value; }
  get message() { return this.contactUsForm.get('message').value; }

}
