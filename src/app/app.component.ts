import { Component } from '@angular/core';
import { Router, NavigationStart, Event, NavigationEnd } from '@angular/router';
import {ToastrService} from "ngx-toastr";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  timeout: any;
  routerChanged = true;
  title: any = 'toaster-not';
  constructor(private router: Router, private toastrService: ToastrService, private auth: AuthService) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        this.routerChanged = true;
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout);
          this.routerChanged = false;
        }, 800);
      }
    });
  }
  ngOnInit() {
    const timer = localStorage.getItem('timer');
    const dateNow = Date.now();
    if(timer) {
      this.auth.loggedIn();
    }
    if (timer && dateNow > Number(timer)) {
      this.auth.logout();
      this.toastrService.success('Phiên đăng nhập đã hết hạn!');
    }
  }
}
