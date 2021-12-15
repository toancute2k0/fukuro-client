import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LocalDataSource} from "ng2-smart-table";
import {RentalRoomsService} from "../../../../../services/rental-rooms.service";
import {RentalsService} from "../../../../../services/rentals.service";
import {RentersService} from "../../../../../services/renters.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-renters-manage-list',
  templateUrl: './renters-manage-list.component.html',
  styleUrls: ['./renters-manage-list.component.css'],
})
export class RentersManageListComponent implements OnInit {
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
      id: {
        title: 'STT'
      },
      name: {
        title: 'Họ và tên'
      },
      email: {
        title: 'Email'
      },
      phone: {
        title: 'SĐT'
      },
      address: {
        title: 'Địa chỉ'
      }
    },
  }

  id: any;
  limit = 6;
  rentals: any;
  apartment: any;
  ground: any;
  isRental = true;
  constructor(private _router: Router,
              private rentalRoomsService: RentalRoomsService,
              private rentalsService: RentalsService,
              private toastrService: ToastrService,
              private rentersService: RentersService
  ) {}

  source: LocalDataSource = new LocalDataSource();
  source2: LocalDataSource = new LocalDataSource();
  source3: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.rentals = [];
    this.apartment = [];
    this.ground = [];
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
                    if(res['rows'][i].type == 2){
                      this.apartment.push(res['rows'][i]);
                    }
                    if(res['rows'][i].type == 3){
                      this.ground.push(res['rows'][i]);
                    }
                  }
                  if(this.rentals.length > 0){
                    this.retrieveRentersByRentalId(this.rentals[0].id);
                    this.rentals[0].active = true;
                  }
                  if(this.apartment.length > 0){
                    this.retrieveRentersByRentalId2(this.apartment[0].id);
                    this.apartment[0].active = true;
                  }
                  if(this.ground.length > 0){
                    this.retrieveRentersByRentalId3(this.ground[0].id);
                    this.ground[0].active = true;
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
    for (let item of this.rentals) {
      item.active = false;
      if(item.id == event){
        item.active = true;
      }
    }
    this.retrieveRentersByRentalId(event);
  }
  change2(event: any){
    for (let item of this.rentals) {
      item.active = false;
      if(item.id == event){
        item.active = true;
      }
    }
    this.retrieveRentersByRentalId2(event);
  }
  change3(event: any){
    for (let item of this.rentals) {
      item.active = false;
      if(item.id == event){
        item.active = true;
      }
    }
    this.retrieveRentersByRentalId3(event);
  }
  retrieveRentersByRentalId(id: any): void {
    this.rentersService.getFindByRentalId(id, this.limit)
      .subscribe(
        (data: any) => {
          this.limit = data['count'];
          this.rentersService.getFindByRentalId(id, this.limit)
            .subscribe(
              (res: any) => {
                this.source = new LocalDataSource(res['rows']);
              });
        },
        error => {
          console.log(error);
        });
  }
  retrieveRentersByRentalId2(id: any): void {
    this.rentersService.getFindByRentalId(id, this.limit)
      .subscribe(
        (data: any) => {
          this.limit = data['count'];
          this.rentersService.getFindByRentalId(id, this.limit)
            .subscribe(
              (res: any) => {
                this.source2 = new LocalDataSource(res['rows']);
              });
        },
        error => {
          console.log(error);
        });
  }
  retrieveRentersByRentalId3(id: any): void {
    this.rentersService.getFindByRentalId(id, this.limit)
      .subscribe(
        (data: any) => {
          this.limit = data['count'];
          this.rentersService.getFindByRentalId(id, this.limit)
            .subscribe(
              (res: any) => {
                this.source3 = new LocalDataSource(res['rows']);
              });
        },
        error => {
          console.log(error);
        });
  }

  onCustomAction(event: any) {
    if(event.action == 'edit'){
      this._router.navigate(['/manage/renters/edit/'+event.data['id']]);
    }
    if(event.action == 'delete'){
      if (window.confirm('Bạn có chắn chắn sẽ xoá không?')) {
        this.rentersService.delete(event.data['id'])
          .subscribe(
            (response: any) => {
              this.rentals = [];
              this.apartment = [];
              this.ground = [];
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
