import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  submitted = false;
  dynamicVariable = true;

  updateCus = this.fb.group({
    username: [
      { value: '', disabled: true },
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    firstName: ['', Validators.compose([Validators.required])],
    lastName: ['', Validators.compose([Validators.required])],
    phone: ['', Validators.compose([Validators.required])],
    facebook: [''],
    google: [''],
    avatar: [''],
  });
  constructor(
    private fb: FormBuilder,
    private customSer: CustomersService,
    private _router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('currentUser');
    this.customSer.get(id!).subscribe((res) => {
      let user = res;
      this.updateCus = this.fb.group({
        id: [user.id],
        username: [
          user.username,
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        email: [
          user.email,
          Validators.compose([Validators.required, Validators.email]),
        ],
        firstName: [user.firstName, Validators.compose([Validators.required])],
        lastName: [user.lastName, Validators.compose([Validators.required])],
        phone: [user.phone, Validators.compose([Validators.required])],
        facebook: [user.facebook],
        google: [user.google],
        avatar: [user.avatar],
      });
    });
  }

  get f() {
    return this.updateCus.controls;
  }

  openFilterSearch() {
    let textArea = document.getElementById(
      'filter_search'
    ) as HTMLTextAreaElement;
    if (textArea.style.display == 'none') {
      textArea.style.display = 'block';
    } else {
      textArea.style.display = 'none';
    }
  }

  onSubmit(): any {
    this.submitted = true;
    const id = localStorage.getItem('currentUser');
    // if (this.updateCus.invalid) {
    //   return false;
    // }
    console.log(this.updateCus.value);
    this.customSer.update(id!, this.updateCus.value).subscribe(
      (res) => {
        console.log(res.data);
        // window.location.reload();
        this.toastrService.success('Cập nhật tài khoản thành công!');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
