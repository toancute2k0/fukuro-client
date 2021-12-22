import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RentalsService} from "../../../../../services/rentals.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {RentalRoomsService} from "../../../../../services/rental-rooms.service";
import {RentersService} from "../../../../../services/renters.service";

@Component({
  selector: 'app-renters-manage-create',
  templateUrl: './renters-manage-create.component.html',
  styleUrls: ['./renters-manage-create.component.css'],
})
export class RentersManageCreateComponent implements OnInit {
  id: any;
  limit = 6;
  limit2 = 6;
  rentals: any;
  rooms: any;
  submitted = false;
  isRoom = 0;
  data: any;
  renterForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9 ]{10}')])],
    birth: ['', Validators.compose([Validators.required])],
    idNumber: ['', Validators.compose([Validators.required])],
    deposit: ['', Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    period: ['', Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
    paymentDate: ['', Validators.compose([Validators.required])],
    note: [''],
    status: [1],
    rentalId: ['', Validators.compose([Validators.required])],
    rentalRoomId: [0]
  });

  constructor(
    private fb: FormBuilder,
    private rentalsService: RentalsService,
    private _router: Router,
    private toastrService: ToastrService,
    private rentalRoomsService: RentalRoomsService,
    private rentersService: RentersService
  ) {}

  get f() {
    return this.renterForm.controls;
  }

  ngOnInit(): void {
    this.rentals= [];
    this.rooms = [];
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
                for (let item of res['rows']) {
                  if(item.type != 1 || (item.type == 1 && item.quantity > 0)){
                    this.rentals.push(item);
                  }
                }
              });
        },
        error => {
          console.log(error);
        });
  }

  change(event: any){
    if(event.target.value != ''){
      for (let item of this.rentals) {
        if(item.id == event.target.value && item.type == 1){
          this.isRoom = 1;
          this.retrieveRoomsByRentalId(item.id);
        }
        if(item.id == event.target.value && item.type > 1){
          this.renterForm.value['rentalRoomId'] = 0;
          this.isRoom = 0;
        }
      }
    }else{
      this.isRoom = 0;
    }
  }

  retrieveRoomsByRentalId(id: any): void {
    this.rentalRoomsService.getFindByRentalId(id, this.limit2)
      .subscribe(
        (data: any) => {
          this.limit2 = data['count'];
          this.rentalRoomsService.getFindByRentalId(id, this.limit2)
            .subscribe(
              (res: any) => {
                this.rooms = res['rows'];
              });
        },
        error => {
          console.log(error);
        });
  }

  onSubmit(): any {
    this.submitted = true;

    if (this.renterForm.invalid) {
      return false;
    }
    if(this.renterForm.value['rentalRoomId'] == 0){
      this.data = {
        name: this.renterForm.value['name'],
        email: this.renterForm.value['email'],
        phone: this.renterForm.value['phone'],
        birth: this.renterForm.value['birth'],
        id_number: this.renterForm.value['idNumber'],
        deposit: this.renterForm.value['deposit'],
        period: this.renterForm.value['period'],
        payment_date: this.renterForm.value['paymentDate'],
        note: this.renterForm.value['note'],
        status: this.renterForm.value['status'],
        rental_id: this.renterForm.value['rentalId'],
        customer_id: localStorage.getItem('currentUser'),
      };
    }else{
      this.data = {
        name: this.renterForm.value['name'],
        email: this.renterForm.value['email'],
        phone: this.renterForm.value['phone'],
        birth: this.renterForm.value['birth'],
        id_number: this.renterForm.value['idNumber'],
        deposit: this.renterForm.value['deposit'],
        period: this.renterForm.value['period'],
        payment_date: this.renterForm.value['paymentDate'],
        note: this.renterForm.value['note'],
        status: this.renterForm.value['status'],
        rental_id: this.renterForm.value['rentalId'],
        rental_room_id: this.renterForm.value['rentalRoomId'],
        customer_id: localStorage.getItem('currentUser'),
      };
    }
    this.rentersService.create(this.data).subscribe(
      (res) => {
        this.resetForm();
        this.toastrService.success('Thêm mới thành công!');
      },
      (error) => {
        this.toastrService.error('Thêm mới thất bại!');
      }
    );
  }
  resetForm(): void {
    this.submitted = false;
    this.renterForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      birth: [''],
      idNumber: [''],
      deposit: [''],
      period: [''],
      paymentDate: [''],
      note: [''],
      status: [1],
      rentalId: [''],
      rentalRoomId: [0]
    });
  }
}
