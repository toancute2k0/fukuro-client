import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AdminContactsService} from "../../../services/admin-contacts.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  submitted = false;
  constructor(
    private fb: FormBuilder,
    private adminContactsService: AdminContactsService,
    private _router: Router,
    private toastrService: ToastrService
  ) {}
  contact = this.fb.group({
    firstName: ['', Validators.compose([Validators.required])],
    lastName: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone: ['', Validators.compose([Validators.required])],
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
      status: ['1'],
    }
    this.adminContactsService.create(this.contact.value).subscribe(
      (res) => {
        this.resetForm();
        this.toastrService.success('Gửi liên hệ thành công! Vui lòng kiểm tra email để xem phản hồi!');
      },
      (error) => {
        this.toastrService.success('Gửi liên hệ thất bại!');
      });
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
