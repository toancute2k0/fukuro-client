import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-dashboard-navigation',
  templateUrl: './dashboard-navigation.component.html',
  styleUrls: ['./dashboard-navigation.component.css'],
})
export class DashboardNavigationComponent implements OnInit {
  currentUser?: any;
  name: string | undefined;
  avatar: string | undefined;
  username: string | undefined;
  constructor(public auth: AuthService, private customSer: CustomersService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('currentUser');

    if (id) {
      this.getById(id);
    }
    this.customSer.profileImageUpdate$.subscribe(
      (profileImage) => (this.avatar = profileImage)
    );
    this.customSer.profileName$.subscribe(
      (profileName) => (this.name = profileName)
    );
    this.customSer.profileUsername$.subscribe(
      (profileUsername) => (this.username = profileUsername)
    );
  }

  getById(id: string): void {
    this.customSer.get(id).subscribe((res) => {
      this.currentUser = res;
      this.avatar = environment.linkImg+res['avatar'];
      this.name = res['firstName'] + ' ' + res['lastName'];
      this.username = res['username'];
    });
  }
}
