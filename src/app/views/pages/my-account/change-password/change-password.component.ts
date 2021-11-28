import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomersService } from '../../../../services/customers.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { MustMatch } from '../../../../services/validators/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  id: any;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private _router: Router,
    private toastrService: ToastrService,
    private http: HttpClient
  ) {}
  changePassword = this.fb.group(
    {
      old_password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^\S*$/),
        ]),
      ],
      new_password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^\S*$/),
        ]),
      ],
      cf_password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^\S*$/),
        ]),
      ],
    },
    {
      validator: MustMatch('new_password', 'cf_password'),
    }
  );

  ngOnInit(): void {
    this.id = localStorage.getItem('currentUser');
  }

  get f() {
    return this.changePassword.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    if (this.changePassword.invalid) {
      return false;
    }
    const data = {
      id: this.id,
      old_password: this.changePassword.value['old_password'],
      new_password: this.changePassword.value['new_password'],
    };
    this.customersService.changePassword(data).subscribe(
      (res) => {
        this.newForm();
        this.toastrService.success('Đổi mật khẩu thành công!');
      },
      (error) => {
        const mess = error.error.text;
        this.toastrService.error('Đổi mật khẩu thất bại!');
      }
    );
  }

  newForm(): void {
    this.submitted = false;
    this.changePassword = this.fb.group({
      old_password: [''],
      new_password: [''],
      cf_password: [''],
    });
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
}
