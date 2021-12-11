import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/services/customers.service';
import { MustMatch } from 'src/app/services/validators/must-match.validator';
import { AuthService } from 'src/app/services/auth.service';

import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  submitted = false;
  error = '';

  register = this.fb.group(
    {
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^\S*$/),
        ]),
      ],
      confirmPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^\S*$/),
        ]),
      ],
      status: ['1'],
    },
    {
      validator: MustMatch('password', 'confirmPassword'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private customSer: CustomersService,
    private _router: Router,
    private toastrService: ToastrService,
    
    private auth: AuthService,
    private socialAuthService: SocialAuthService
  ) { }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      // console.log(res);
      
      var data ={
        token: res.idToken
      }
      
      this.submitted = true;
      // console.log(res.idToken);


      this.customSer
      .loginWithGoogle(data).subscribe(
        (res) => {
          localStorage.setItem('token', res.token);
          const time_to_login = Date.now() + 604800000;
          localStorage.setItem('timer', JSON.stringify(time_to_login));
          localStorage.setItem('currentUser', res.data['id']);
          this.auth.loggedIn();
          this._router.navigate(['/']);
          this.toastrService.success('Đăng nhập thành công!');
        },
        (error) => {
          this.error = error.error.message;
          this.toastrService.error(this.error);

        }
      );

    


    });
  }



  ngOnInit(): void { }

  get f() {
    return this.register.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    // return validators
    if (this.register.invalid) {
      return false;
    }
    // console.log(this.register.value);
    // add custom_ser
    this.customSer.create(this.register.value).subscribe(
      (res) => {
        // console.log(res);
        this._router.navigate(['/dang-nhap']);
        this.toastrService.success('Vui lòng đăng nhập', 'Đăng ký thành công!');
      },
      (error) => {
        console.log(error);
      }
    );
  }






}
