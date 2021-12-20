import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RentalsService} from "../../../../../services/rentals.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {RentalRoomsService} from "../../../../../services/rental-rooms.service";
import {RentersService} from "../../../../../services/renters.service";

@Component({
  selector: 'app-renters-manage-edit',
  templateUrl: './renters-manage-edit.component.html',
  styleUrls: ['./renters-manage-edit.component.css'],
})
export class RentersManageEditComponent implements OnInit {
  id: any;
  currentUser: any;
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
    phone: ['', Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
    birth: ['', Validators.compose([Validators.required])],
    idNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
    deposit: ['', Validators.compose([Validators.required])],
    period: ['', Validators.compose([Validators.required])],
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
    private rentersService: RentersService,
    private activatedRoute: ActivatedRoute,
  ) {}

  get f() {
    return this.renterForm.controls;
  }

  ngOnInit(): void {
    this.rooms = [];
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.retrieveRentalsByCustomerId(this.currentUser);
    }
    this.id = this.activatedRoute.snapshot.params.id;
    this.getData(this.id);
  }

  getData(id: any): void {
    this.rentersService.get(id)
      .subscribe(
        (data: any) => {
          this.renterForm = this.fb.group({
            name: [data.name, Validators.compose([Validators.required])],
            email: [data.email, Validators.compose([Validators.required, Validators.email])],
            phone: [data.phone, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
            birth: [data.birth, Validators.compose([Validators.required])],
            idNumber: [data.idNumber, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
            deposit: [data.deposit, Validators.compose([Validators.required])],
            period: [data.period, Validators.compose([Validators.required])],
            paymentDate: [data.paymentDate, Validators.compose([Validators.required])],
            note: [data.note],
            status: [data.status],
            rentalId: [data.rentalId, Validators.compose([Validators.required])],
            rentalRoomId: [data.rentalRoomId]
          });
          this.rentalsService.get(data.rentalId)
            .subscribe(
              (data: any) => {
                if(data.type == 1){
                  this.isRoom = 1;
                  this.retrieveRoomsByRentalId(data.rentalId);
                }
              });
        },
        (error: any) => {
          console.log(error);
        });
  }

  retrieveRentalsByCustomerId(id: any): void {
    this.rentalsService.getFindByCustomerId(id, this.limit)
      .subscribe(
        (data: any) => {
          this.limit = data['count'];
          this.rentalsService.getFindByCustomerId(id, this.limit)
            .subscribe(
              (res: any) => {
                this.rentals = res['rows'];
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
    window.location.reload();
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
        rental_id: this.renterForm.value['rentalId']
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
      };
    }

    this.rentersService.update(this.id, this.data).subscribe(
      (res: any) => {
        this.toastrService.success(res.message);
      },
      (error: any) => {
        this.toastrService.error(error.message);
      }
    );
  }
}
