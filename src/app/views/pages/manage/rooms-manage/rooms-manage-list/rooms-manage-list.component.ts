import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import {RentalRoomsService} from "../../../../../services/rental-rooms.service";
import {RentalsService} from "../../../../../services/rentals.service";

@Component({
  selector: 'app-rooms-manage-list',
  templateUrl: './rooms-manage-list.component.html',
  styleUrls: ['./rooms-manage-list.component.css'],
})
export class RoomsManageListComponent implements OnInit {
  id: any;
  limit = 6;
  rentals: any;
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
        title: 'Tên phòng trọ'
      },
      price: {
        title: 'Giá phòng'
      },
      area: {
        title: 'Diện tích'
      },
      numberPeople: {
        title: 'Số người phù hợp'
      },
      vacancyDate: {
        title: 'Ngày phòng sẽ trống'
      },
      status: {
        title: 'Trạng Thái',
        type: 'html',
        valuePrepareFunction: (value: any) => {
          return value == 1 ? 'Đã cho thuê' : 'Chưa cho thuê';
        },
      },
    },
  }

  isRental = true;

  source: LocalDataSource = new LocalDataSource();

  constructor(private _router: Router,
              private rentalRoomsService: RentalRoomsService,
              private rentalsService: RentalsService
              ) {}

  ngOnInit(): void {
    this.rentals = [];
    this.id = localStorage.getItem('currentUser');
    if (this.id) {
      this.retrieveRentalsByCustomerId(this.id);
    }
  }

  retrieveRentalsByCustomerId(id: any): void {
    this.rentalsService.getFindByCustomerId(id, this.limit)
      .subscribe(
        (data: any) => {
          if(data['count'] > 0){
            this.limit = data['count'];
            this.rentalsService.getFindByCustomerId(id, this.limit)
              .subscribe(
                (res: any) => {
                  for (var i = 0; i < res['rows'].length; i++) {
                    if(res['rows'][i].type == 1){
                      this.rentals.push(res['rows'][i]);
                    }
                  }
                });
          }else {
            this.isRental = false;
          }
        },
        error => {
          console.log(error);
        });
  }

  change(event: any){
    // if(event.target.value != ''){
    //   if(event.target.value == 1){
    //     this.isRental = 1;
    //   }else{
    //     this.isRental = 2;
    //   }
    //   this.retrieveRentalsByRentalId(event.target.value);
    // }else{
    //   this.isRental = 0;
    //   this.retrieveRentalsByRentalId(0);
    // }
  }

  retrieveRentalsByRentalId(id: any): void {
    this.rentalRoomsService.getFindByRentalId(id, this.limit)
      .subscribe(
        (data: any) => {
          this.limit = data['count'];
          this.rentalRoomsService.getFindByRentalId(id, this.limit)
            .subscribe(
              (res: any) => {
                this.source = new LocalDataSource(res['rows']);
              });
        },
        error => {
          console.log(error);
        });
  }

  onCustomAction(event: any) {
    if(event.action == 'edit'){
      this._router.navigate(['/manage/rooms/edit/'+event.data['id']]);
    }
    if(event.action == 'delete'){
      window.confirm('Bạn có chắn chắn sẽ xoá không?');
    }
  }
}
