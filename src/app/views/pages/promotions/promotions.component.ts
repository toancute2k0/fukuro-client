import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  submitted = false;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private toastrService: ToastrService
  ) {}
  contact = this.fb.group({
    firstName: ['', Validators.compose([Validators.required])],
    lastName: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9 ]{10}')])],
    subject: ['', Validators.compose([Validators.required])],
    message: ['', Validators.compose([Validators.required])],
    status: ['1'],
  });

  ngOnInit(): void {
  }

  get f() {
    return this.contact.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    if (this.contact.invalid) {
      return false;
    }
    const data = {
      first_name: this.contact.value['firstName'],
      last_name: this.contact.value['lastName'],
      email: this.contact.value['email'],
      phone: this.contact.value['phone'],
      subject: this.contact.value['subject'],
      message: this.contact.value['message'],
      status: '1',
    }
  }
  resetForm(): void {
    this.submitted = false;
    this.contact = this.fb.group(
      {
        firstName: [''],
        lastName: [''],
        email: [''],
        phone: [''],
        subject: [''],
        message: [''],
        status: ['1'],
      });
  }
}
