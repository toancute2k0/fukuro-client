import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {RentalsService} from "../../../../../services/rentals.service";
import { LocalDataSource } from 'ng2-smart-table';
import {CustomersService} from "../../../../../services/customers.service";
import {ToastrService} from "ngx-toastr";
import {RentalRoomsService} from "../../../../../services/rental-rooms.service";

@Component({
  selector: 'app-motels-manage-list',
  templateUrl: './motels-manage-list.component.html',
  styleUrls: ['./motels-manage-list.component.css'],
})
export class MotelsManageListComponent implements OnInit {
  settings = {
    actions: {
      custom: [
        {
          name: 'edit',
          title: `<i class="ti-pencil text-success" title="Edit"></i>`
        },
        {
          name: 'delete',
          title: `<i class="ti-trash text-danger" title="delete"></i>`
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      name: {
        title: 'Tên trọ'
      },
      quantity: {
        title: 'Số phòng'
      },
      price: {
        title: 'Giá tiền',
        valuePrepareFunction: (value: any) => {
          if(value == 0){
            var uy = '?/phòng';
            return uy;
          }else{
            var uy = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'VND'
            }).format(value);
            return uy;
          }
        },
      },
      customerName: {
        title: 'Tên chủ trọ'
      },
      email: {
        title: 'Email'
      },
      phone: {
        title: 'Số điện thoại'
      }
    },
  }
  limit = 6;
  id: any;
  data: any;
  constructor(
    private rentalsService: RentalsService,
    private _router: Router,
    private customSer: CustomersService,
    private toastrService: ToastrService,
    private rentalRoomsService: RentalRoomsService
  ) { }

  source: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.data = [];
    this.id = localStorage.getItem('currentUser');
    if (this.id) {
      this.retrieveRentalsByCustomerId(this.id);
    }
  }

  retrieveRentalsByCustomerId(id: any): void {
    this.rentalsService.getFindByCustomerId(id, this.limit)
      .subscribe(
        (data: any) => {
          this.limit = data['count'];
          this.rentalsService.getFindByCustomerId(id, this.limit)
            .subscribe(
              (res: any) => {
                this.getCustomer(this.id);
                for (let item of res['rows']){
                  this.data.push(item);
                }
              });
        },
        error => {
          console.log(error);
        });
  }

  getCustomer(id: any){
    this.customSer.get(id)
      .subscribe(
        (data: any) => {
          for (let item of this.data) {
            item.customerName = data.firstName + ' '+ data.lastName;
            item.email = data.email;
            item.phone = data.phone;
          }
          this.source = this.data;
        },
        (error )=> {
          console.log(error);
        });
  }

  onCustomAction(event: any) {
    if(event.action == 'edit'){
      this._router.navigate(['/manage/motels/edit/'+event.data['id']]);
    }
    if(event.action == 'delete'){
      if (window.confirm('Bạn có chắn chắn sẽ xoá không?')) {
        this.rentalsService.delete(event.data['id'])
          .subscribe(
            (response: any) => {
              this.data = [];
              this.retrieveRentalsByCustomerId(this.id);
              this.toastrService.success(response.message);
            },
            (error: any) => {
              this.toastrService.error(error.message);
            });
      }
    }
  }

}
