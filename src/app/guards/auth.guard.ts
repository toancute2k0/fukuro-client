import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }
    this.router.navigate(['/dang-nhap'],{queryParams:{'returnUrl':state.url}});
    return false;
  }
}
