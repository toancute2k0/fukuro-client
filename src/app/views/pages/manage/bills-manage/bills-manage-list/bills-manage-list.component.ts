import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RentalBillsService} from "../../../../../services/rental-bills.service";
import {LocalDataSource} from "ng2-smart-table";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-bills-manage-list',
  templateUrl: './bills-manage-list.component.html',
  styleUrls: ['./bills-manage-list.component.css'],
})
export class BillsManageListComponent implements OnInit {
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
        title: 'Tên hoá đơn'
      },
      price: {
        title: 'Giá tiền phòng',
        valuePrepareFunction: (value: any) => {
          var uy = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'VND'
          }).format(value);
          return uy;
        },
      },
      prepay: {
        title: 'Trả trước',
        type: 'html',
        valuePrepareFunction: (value: any) => {
          var uy = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'VND'
          }).format(value);
          return uy;
        },
      },
      discountPrice: {
        title: 'Giảm giá',
        valuePrepareFunction: (value: any) => {
          return value + '%';
        },
      },
      totalPrice: {
        title: 'Tổng tiền',
        type: 'html',
        valuePrepareFunction: (value: any) => {
          var uy = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'VND'
          }).format(value);
          return uy;
        },
      },
      status: {
        title: 'Trạng thái',
        type: 'html',
        valuePrepareFunction: (value: any) => {
          if(value == 0){
            return 'Chưa thanh toán';
          }else{
            return 'Đã thanh toán';
          }
        },
      },
    },
  }
  limit = 6;
  id: any;
  data: any;

  constructor(private _router: Router,
              private rentalBillsService: RentalBillsService,
              private toastrService: ToastrService) { }

  source: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.data = [];
    this.id = localStorage.getItem('currentUser');
    if (this.id) {
      this.retrieveRentalBillsByCustomerId(this.id);
    }
  }

  retrieveRentalBillsByCustomerId(id: any): void {
    this.rentalBillsService.getFindByCustomerId(id, this.limit)
      .subscribe(
        (data: any) => {
          this.limit = data['count'];
          this.rentalBillsService.getFindByCustomerId(id, this.limit)
            .subscribe(
              (res: any) => {
                  for (let item of res['rows']) {
                    this.data.push(item);
                  }
                  this.source = this.data;
              });
        },
        error => {
          console.log(error);
        });
  }

  onCustomAction(event: any) {
    if(event.action == 'edit'){
      this._router.navigate(['/manage/bills/edit/'+event.data['id']]);
    }
    if(event.action == 'delete'){
      if (window.confirm('Bạn có chắn chắn sẽ xoá không?')) {
        this.rentalBillsService.delete(event.data['id'])
          .subscribe(
            (response: any) => {
              this.data = [];
              this.retrieveRentalBillsByCustomerId(this.id);
              this.toastrService.success(response.message);
            },
            (error: any) => {
              this.toastrService.error(error.message);
            });
      }
    }
  }
}
