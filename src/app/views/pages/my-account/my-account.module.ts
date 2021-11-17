import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { RentalManageComponent } from './rental-manage/rental-manage.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NotificationComponent } from './notification/notification.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardNavigationComponent } from './dashboard-navigation/dashboard-navigation.component';


@NgModule({
  declarations: [
    MyAccountComponent,
    UserDashboardComponent,
    RentalManageComponent,
    MyProfileComponent,
    NotificationComponent,
    BookmarkComponent,
    ChangePasswordComponent,
    DashboardNavigationComponent
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule
  ]
})
export class MyAccountModule { }
