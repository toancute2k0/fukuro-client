import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customers } from 'src/app/models/customers.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  returnUrl: string | undefined;
  error = '';
  login = this.fb.group(
    {
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
    }
  );

  constructor(
    private fb: FormBuilder,
    private customSer: CustomersService,
    private route: ActivatedRoute,
    private _router: Router,
    private toastrService: ToastrService
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
    this.customSer.login(this.login.value).subscribe(
      (res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.id));

        // console.log(localStorage.getItem('currentUser'));
        // console.log(this.userData);

        this._router.navigate([this.returnUrl]);
        this.toastrService.success('Đăng nhập thành công!');
      },
      (error) => {
        this.error = error.error.message;
        this.toastrService.error(this.error);
      }
    );
  }

}
