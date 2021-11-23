import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customers } from 'src/app/models/customers.model';
import { CustomersService } from 'src/app/services/customers.service';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  returnUrl: any;
  error = '';
  login = this.fb.group({
    username: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^\S*$/),
      ]),
    ],
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
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.login.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    // return validators
    if (this.login.invalid) {
      return false;
    }
    // console.log(this.login.value);
    // add custom_ser
    // this.customSer.login(this.login.value).subscribe(
    //   (res) => {
    //     localStorage.setItem('token', res.token);
    //     const time_to_login = Date.now() + 604800000; // one week
    //     localStorage.setItem('timer', JSON.stringify(time_to_login));

    //     localStorage.setItem('currentUser', JSON.stringify(res.data));

    //     this.auth.loggedIn();
    //     this._router.navigateByUrl(this.returnUrl);
    //     // window.location.reload();
    //     this.toastrService.success('Đăng nhập thành công!');
    //   },
    //   (error) => {
    //     this.error = error.error.message;
    //     this.toastrService.error(this.error);
    //   }
    // );

    this.customSer
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          localStorage.setItem('token', data.token);
          const time_to_login = Date.now() + 604800000; // one week
          localStorage.setItem('timer', JSON.stringify(time_to_login));

          this.auth.loggedIn();
          // this._router.navigateByUrl(this.returnUrl);
          this._router
            .navigateByUrl(this.returnUrl, { skipLocationChange: true })
            .then(() => {
              this._router.navigate(['/']);
            });

          this.toastrService.success('Đăng nhập thành công!');
        },
        (error) => {
          this.error = error.error.message;
          this.toastrService.error(this.error);
        }
      );
  }
}
