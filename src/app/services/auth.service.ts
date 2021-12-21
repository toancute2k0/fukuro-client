import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {CustomersService} from "./customers.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn?: boolean;
  error = '';

  constructor(
    private _router: Router,
    private toastrService: ToastrService,
    private customersService: CustomersService
  ) { }

  loggedIn() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = token ? true : false;
    return this.isLoggedIn;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('timer');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this._router.navigate(['/']);
    this.toastrService.success('Đăng xuất thành công!');

  }

  getToken() {
    return localStorage.getItem('token');
  }
}
