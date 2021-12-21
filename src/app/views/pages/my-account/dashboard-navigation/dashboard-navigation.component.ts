import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import {environment} from "../../../../../environments/environment";
import {CustomerPremiumServicesService} from "../../../../services/customer-premium-services.service";

@Component({
  selector: 'app-dashboard-navigation',
  templateUrl: './dashboard-navigation.component.html',
  styleUrls: ['./dashboard-navigation.component.css'],
})
export class DashboardNavigationComponent implements OnInit {
  linkImg = environment.linkImg;
  currentUser?: any;
  name: string | undefined;
  avatar: string | undefined;
  username: string | undefined;
  customerPremiumServices: any = [];
  limit = 6;
  id: any;
  manage = false;
  constructor(public auth: AuthService,
              private customSer: CustomersService,
              private customerPremiumServicesService: CustomerPremiumServicesService) {}

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
    this.getData();
  }

  getData(): void {
    this.customerPremiumServicesService.checkPremiumByCustomerId(this.id).subscribe((data: any | undefined) => {
        // this.customerPremiumServices = data;
        if(data.count > 0){
          for (let item of data.rows) {
            if(item.PremiumService.type == 2){
              this.manage = true;
            }
          }
        }
      });
  }

  getById(id: string): void {
    this.customSer.get(id).subscribe((res) => {
      this.currentUser = res;
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
  }
}
