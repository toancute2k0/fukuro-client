import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customers } from 'src/app/models/customers.model';
import { CustomersService } from 'src/app/services/customers.service';
import { CustomerPremiumServicesService } from 'src/app/services/customer-premium-services.service';
import { AuthService } from 'src/app/services/auth.service';
import {environment} from "../../../../../environments/environment";
import { first } from 'rxjs/operators';

import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  returnUrl: any;
  error = '';
  success = '';
  avatar: any;
  linkImg = environment.linkImg;
  name: any;
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
    private auth: AuthService,
    private socialAuthService: SocialAuthService,
    private customerPremiumServicesService: CustomerPremiumServicesService
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
    this.customSer
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          if(data.data.avatar == null){
            this.avatar = 'https://via.placeholder.com/200x200';
          }
          if(data.data.avatar != null && data.data.googleId != null){
            this.avatar = data.data.avatar;
          }
          if(data.data.avatar != null && data.data.googleId == null){
            this.avatar = this.linkImg + data.data.avatar;
          }
          if(data.data.firstName != null && data.data.lastName != null){
            this.name = data.data.firstName + ' ' + data.data.lastName;
          }
          if(data.data.firstName != null && data.data.lastName != null){
            this.name = data.data.firstName + ' ' + data.data.lastName;
          }
          if(data.data.firstName == null && data.data.lastName == null){
            this.name = data.data.username;
          }

          localStorage.setItem('token', data.token);
          const time_to_login = Date.now() + 604800000; // one week
          localStorage.setItem('timer', JSON.stringify(time_to_login));
          this.auth.loggedIn();
          this.customSer.profileImageUpdate$.next(this.avatar);
          this.customSer.profileUsername$.next(this.name);
          this.customSer.profileId$.next(data.data.id);
          this._router.navigate(['/']);
          this.toastrService.success(data.message);
        },
        (error) => {
          if (error.error.message) {
            this.error = error.error.message;
            this.toastrService.error(this.error);
          } else {
            this.error = error.error;
            this.toastrService.error(this.error);
          }
        }
      );
  }

  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log(res);

        var data = {
          token: res.idToken,
        };

        this.submitted = true;
        console.log(res.idToken);

        this.customSer.loginWithGoogle(data).subscribe(
          (res) => {
            if(res.data.avatar == null){
              this.avatar = 'https://via.placeholder.com/200x200';
            }
            if(res.data.avatar != null && res.data.googleId != null){
              this.avatar = res.data.avatar;
            }
            if(res.data.avatar != null && res.data.googleId == null){
              this.avatar = this.linkImg + res.data.avatar;
            }
            if(res.data.firstName != null && res.data.lastName != null){
              this.name = res.data.firstName + ' ' + res.data.lastName;
            }
            if(res.data.firstName != null && res.data.lastName != null){
              this.name = res.data.firstName + ' ' + res.data.lastName;
            }
            if(res.data.firstName == null && res.data.lastName == null){
              this.name = res.data.username;
            }
            this.customSer.profileImageUpdate$.next(this.avatar);
            this.customSer.profileUsername$.next(this.name);
            this.customSer.profileId$.next(res.data.id);
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

        // this.customSer
        //   .loginWithGoogle(res.idToken)
        //   .pipe(first())
        //   .subscribe(
        //     (data) => {
        //       localStorage.setItem('token', data.token);
        //       const time_to_login = Date.now() + 604800000; // one week
        //       localStorage.setItem('timer', JSON.stringify(time_to_login));

        //       this.auth.loggedIn();
        //       // this._router.navigateByUrl(this.returnUrl);
        //       // this._router
        //       //   .navigateByUrl(this.returnUrl, { skipLocationChange: true })
        //       //   .then(() => {
        //       //     this._router.navigate(['/']);
        //       //   });
        //       let name = data.data.firstName + ' ' + data.data.lastName;
        //       this.customSer.profileImageUpdate$.next(data.data.avatar);
        //       this.customSer.profileName$.next(name);
        //       this.customSer.profileUsername$.next(data.data.username);
        //       this.customSer.profileId$.next(data.data.id);
        //       this._router.navigate(['/']);
        //       this.toastrService.success('Đăng nhập thành công!');
        //     },
        //     (error) => {
        //       this.error = error.error.message;
        //       this.toastrService.error(this.error);
        //     }
        //   );
      });
  }
}
