import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditRentalComponent } from './edit-rental/edit-rental.component';
import { MyAccountComponent } from './my-account.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NotificationComponent } from './notification/notification.component';
import { RentalManageComponent } from './rental-manage/rental-manage.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderDetailsComponent } from './order-history/order-details/order-details.component';
import { ManagePremiumsComponent } from './manage-premiums/manage-premiums.component';
import { CustomerContactsComponent } from './customer-contacts/customer-contacts.component';
import { CustomerContactDetailsComponent } from './customer-contacts/customer-contact-details/customer-contact-details.component';

const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    children: [
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'bookmark',
        component: BookmarkComponent,
      },
      {
        path: 'notification',
        component: NotificationComponent,
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
      },
      {
        path: 'renal-manage',
        component: RentalManageComponent,
      },
      {
        path: 'order-history',
        component: OrderHistoryComponent,
      },
      {
        path: 'order-history/:id',
        component: OrderDetailsComponent,
      },
      {
        path: 'chinh-sua-tin-cho-thue/:id',
        component: EditRentalComponent,
      },
      {
        path: 'manage-premiums',
        component: ManagePremiumsComponent,
      },
      {
        path: 'customer-contacts',
        component: CustomerContactsComponent,
      },
      {
        path: 'customer-contacts/detail/:id',
        component: CustomerContactDetailsComponent,
      },
      {
        path: '',
        component: UserDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
