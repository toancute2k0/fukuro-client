import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/services/customers.service';
import { MustMatch } from 'src/app/services/validators/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  submitted = false;
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
    },
    {
      validator: MustMatch('password', 'confirmPassword'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private customSer: CustomersService,
    private _router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

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
        this.toastrService.success('Vui lòng đăng nhập', 'Đăng kí thành công!');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
