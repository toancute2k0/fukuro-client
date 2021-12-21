import { Component, Input, OnInit } from '@angular/core';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { Customers } from 'src/app/models/customers.model';
import { AuthService } from 'src/app/services/auth.service';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogsService } from 'src/app/services/blogs.service';
import { CustomersService } from 'src/app/services/customers.service';
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-header-manage',
  templateUrl: './header-manage.component.html',
  styleUrls: ['./header-manage.component.css'],
})
export class HeaderManageComponent implements OnInit {
  linkImg = environment.linkImg;
  name : string | undefined;
  avatar : string | undefined;
  username : string | undefined;
  currentUser?: any;
  id: any;
  countNewNotification: any;
  limit = 6;
  constructor(
    public auth: AuthService,
    private customSer: CustomersService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('currentUser');
    if (this.id) {
      this.getById(this.id);
    }
    this.customSer.profileImageUpdate$.subscribe(
      (profileImage) => (this.avatar = profileImage)
    );
    this.customSer.profileUsername$.subscribe(
      (profileUsername) => (this.username = profileUsername)
    );
    this.customSer.notifications$.subscribe((notifications) => this.countNewNotification = notifications);
    this.countNew();
  }

  countNew(){
    this.notificationService.getByCustomerId(this.id, this.limit, 0).subscribe((res: any | undefined) => {
      if (res['count'] > this.limit) {
        this.notificationService.getByCustomerId(this.id, this.limit, 0).subscribe((data: any | undefined) => {
          this.customSer.notifications$.next(res['count']);
        });
      } else {
        this.customSer.notifications$.next(res['count']);
      }
    });
  }

  getById(id: string): void {
    this.customSer.get(id).subscribe((res) => {
      this.customSer.get(id).subscribe((res) => {
        if(res.avatar == null){
          this.avatar = 'https://via.placeholder.com/200x200';
          this.customSer.profileImageUpdate$.next(this.avatar);
        }
        if(res.avatar != null  && res.googleId != null){
          this.avatar = res['avatar'];
          this.customSer.profileImageUpdate$.next(this.avatar);
        }
        if(res.avatar != null  && res.googleId == null){
          this.avatar = this.linkImg + res['avatar'];
          this.customSer.profileImageUpdate$.next(this.avatar);
        }
        this.username = res.username;
      });
    });
  }

}
