import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { PremiumServiceService } from 'src/app/services/premium-service.service';
import {CustomerPremiumServicesService} from "../../../services/customer-premium-services.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-order-package',
  templateUrl: './order-package.component.html',
  styleUrls: ['./order-package.component.css'],
})
export class OrderPackageComponent implements OnInit {
  premium: any;
  id: any;
  constructor(private premiumSer: PremiumServiceService,
              private customerPremiumServicesService: CustomerPremiumServicesService,
              private customersService: CustomersService){}

  ngOnInit(): void {
    this.id = localStorage.getItem('currentUser');
    if(this.id != null){
      this.premiumSer.getAll('3').subscribe(
        (data: any | undefined) => {
          this.premium = data['rows'];
          this.customerPremiumServicesService.checkPremiumByCustomerId(this.id).subscribe(
            (res: any | undefined) => {
              for (let item of res.rows) {
                for (let ite of this.premium) {
                  if (item.premiumId == ite.id) {
                    if(item.status == 1){
                      ite.registered = 1;
                    }
                    if(item.status == 2){
                      ite.registered = 2;
                    }
                    if(item.status == 0){
                      ite.registered = 0;
                    }
                  }
                }
              }
            });
        },
        (err) => {
          console.log(err);
        }
      );
    }else{
      this.premiumSer.getAll('3').subscribe(
        (data: any | undefined) => {
          this.premium = data['rows'];
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
