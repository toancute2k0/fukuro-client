import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customers } from 'src/app/models/customers.model';
import { CustomersService } from 'src/app/services/customers.service';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  done = false;
  submitted = false;
  returnUrl: any;
  error = '';
  forgotPassword = this.fb.group({
    username: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    email: ['', Validators.compose([Validators.required, Validators.email])],
  });

  constructor(
    private fb: FormBuilder,
    private customSer: CustomersService,
    private route: ActivatedRoute,
    private _router: Router,
    private toastrService: ToastrService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  get f() {
    return this.forgotPassword.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    // return validators
    if (this.forgotPassword.invalid) {
      return false;
    }
    this.customSer.forgotPassword(this.forgotPassword.value).subscribe(
      (response) => {
        // console.log(response);
      },
      (error) => {
        if (error.error.text == 'Success') {
          this.done = true;
          this.toastrService.success(
            'Gửi yêu cầu thành công! Vui lòng kiểm tra email!!'
          );
        } else {
          this.done = false;
          this.toastrService.error(error.error.text);
        }
      }
    );
  }
}
