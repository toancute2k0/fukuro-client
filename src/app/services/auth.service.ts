import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn?: boolean;

  constructor(private _router: Router) {}

  loggedIn() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = token ? true : false;
    return this.isLoggedIn;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.clear();
    this._router.navigate(['/']);
    window.location.reload();
  }

  getToken() {
    return localStorage.getItem('token');
  }
}