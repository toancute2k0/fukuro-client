import { Component, Input, OnInit } from '@angular/core';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { Customers } from 'src/app/models/customers.model';
import { AuthService } from 'src/app/services/auth.service';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogsService } from 'src/app/services/blogs.service';
import { CustomersService } from 'src/app/services/customers.service';
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-header-manage',
  templateUrl: './header-manage.component.html',
  styleUrls: ['./header-manage.component.css'],
})
export class HeaderManageComponent implements OnInit {
  name : string | undefined;
  avatar : string | undefined;
  username : string | undefined;
  currentUser?: any;
  constructor(
    public auth: AuthService,
    private customSer: CustomersService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('currentUser');

    if (id) {
      this.getById(id);
    }
    this.customSer.profileImageUpdate$.subscribe((profileImage) => this.avatar = profileImage);
    this.customSer.profileName$.subscribe((profileName) => this.name = profileName);
    this.customSer.profileUsername$.subscribe((profileUsername) => this.username = profileUsername);
  }

  getById(id: string): void {
    this.customSer.get(id).subscribe((res) => {
      this.avatar = res['avatar'];
      this.name = res['firstName']+' '+res['lastName'];
      this.username = res['username'];
    });
  }

}
