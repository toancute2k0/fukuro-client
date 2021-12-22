import { Component, OnInit } from '@angular/core';
import { CustomerContacts } from 'src/app/models/customer-contacts.model';
import { CustomerContactsService } from 'src/app/services/customer-contacts.service';
import {NotificationService} from "../../../../services/notification.service";
import {Router} from "@angular/router";
import {CustomersService} from "../../../../services/customers.service";

@Component({
  selector: 'app-customer-contacts',
  templateUrl: './customer-contacts.component.html',
  styleUrls: ['./customer-contacts.component.css'],
})
export class CustomerContactsComponent implements OnInit {
  limit = 6;
  customerContacts?: CustomerContacts[];
  id: any;
  status = 0;
  constructor(private customerContactsService: CustomerContactsService,
              private notificationService: NotificationService,
              private _router: Router,
              private customersService: CustomersService) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('currentUser');
    if (this.id) {
      this.getById();
    }
  }

  getById(): void {
    this.customerContactsService.getByCustomerId(this.id , this.limit).subscribe((res: any | undefined) => {
      if(res['count'] > this.limit){
        this.customerContactsService.getByCustomerId(this.id , this.limit).subscribe((data: any | undefined) => {
          this.customerContacts = data['rows'];
        });
      }else{
        this.customerContacts = res['rows'];
      }
    });
  }

  redirect(object: any): void {
    this.notificationService.getByCustomerId(this.id, this.limit, this.status).subscribe((res: any | undefined) => {
      if (res['count'] > this.limit) {
        this.notificationService.getByCustomerId(this.id, this.limit, this.status).subscribe((data: any | undefined) => {
          for (let item of data['rows']) {
            if(item.detailUrl == '/my-account/customer-contacts/detail/'+object.id){
              this.update(item);
            }
          }
        });
      } else {
        for (let item of res['rows']) {
          const url = '/my-account/customer-contacts/detail/'+object.id;
          if(item.detailUrl == url){
            this.update(item);
          }
        }
      }
    });
  }

  update(data: any){
    const dataUpdate = {status: 1};
    if(data.status == 0){
      this.notificationService.update(data.id, dataUpdate).subscribe(
        (response) => {
          this.countNew();
          this._router.navigate([data.detailUrl]);
          this.getById();
        });
    }else{
      this._router.navigate([data.detailUrl]);
    }
  }

  countNew(){
    this.notificationService.getByCustomerId(this.id, this.limit, 0).subscribe((res: any | undefined) => {
      if (res['count'] > this.limit) {
        this.notificationService.getByCustomerId(this.id, this.limit, 0).subscribe((data: any | undefined) => {
          this.customersService.notifications$.next(res['count']);
        });
      } else {
        this.customersService.notifications$.next(res['count']);
      }
    });
  }

  openFilterSearch() {
    let textArea = document.getElementById(
      'filter_search'
    ) as HTMLTextAreaElement;
    if (textArea.style.display == 'none') {
      textArea.style.display = 'block';
    } else {
      textArea.style.display = 'none';
    }
  }
}
