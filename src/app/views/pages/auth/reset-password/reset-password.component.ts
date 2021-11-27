import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customers } from 'src/app/models/customers.model';
import { CustomersService } from 'src/app/services/customers.service';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import {MustMatch} from "../../../../services/validators/must-match.validator";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  id: any;
  done = false;
  submitted = false;
  returnUrl: any;
  error = '';
  resetPassword = this.fb.group({
    email: ['', Validators.compose([Validators.required])],
    token: ['', Validators.compose([Validators.required])],
    password: [
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
        Validators.pattern(/^\S*$/)])]},
    {
      validator: MustMatch('password', 'cf_password'),
    });

  constructor(
    private fb: FormBuilder,
    private customSer: CustomersService,
    private route: ActivatedRoute,
    private _router: Router,
    private toastrService: ToastrService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('id');

    this.route.queryParams.subscribe(params => {
      this.resetPassword.patchValue({
        email: params['email'],
        token: params['token'],
      });
    });
  }

  get f() {
    return this.resetPassword.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    // return validators
    if (this.resetPassword.invalid) {
      return false;
    }
    const data = {
      email: this.resetPassword.value['email'],
      token: this.resetPassword.value['token'],
      password: this.resetPassword.value['password'],
    }
    console.log(data);
    this.customSer.resetPassword(data).subscribe(
      (response) => {
        this._router.navigate(['/dang-nhap']);
        this.toastrService.success(response.message);
      },
      (error) => {
        const mess = error.error.text;
        this.toastrService.error(mess);
      });
  }
}
