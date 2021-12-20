import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RentalRoomsService} from "../../../../../services/rental-rooms.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LocalDataSource} from "ng2-smart-table";
import {RentalsService} from "../../../../../services/rentals.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-rooms-manage-create',
  templateUrl: './rooms-manage-create.component.html',
  styleUrls: ['./rooms-manage-create.component.css'],
})
export class RoomsManageCreateComponent implements OnInit {
  submitted = false;
  roomForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    price: ['', Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
    area: ['', Validators.compose([Validators.required])],
    numberPeople: ['', Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
    vacancyDate: ['', Validators.compose([Validators.required])],
    note: [''],
    status: [0],
    rentalId: ['', Validators.compose([Validators.required])],
  });
  id: any;
  limit = 6;
  rentals: any;

  constructor(
    private fb: FormBuilder,
    private rentalRoomsService: RentalRoomsService,
    private _router: Router,
    private toastrService: ToastrService,
    private rentalsService: RentalsService,
    private datePipe: DatePipe
  ) {
  }
  get f() {
    return this.roomForm.controls;
  }

  ngOnInit(): void {
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
                this.rentals = [];
                for (let item of res['rows']) {
                  if(item.type == 1){
                    this.rentals.push(item);
                  }
                }
              });
        },
        error => {
          console.log(error);
        });
  }

  onSubmit(): any {
    this.submitted = true;

    if (this.roomForm.invalid) {
      return false;
    }
    const data = {
      name: this.roomForm.value['name'],
      price: this.roomForm.value['price'],
      area: this.roomForm.value['area'],
      number_people: this.roomForm.value['numberPeople'],
      vacancy_date: this.roomForm.value['vacancyDate'],
      note: this.roomForm.value['note'],
      status: this.roomForm.value['status'],
      rental_id: this.roomForm.value['rentalId'],
    };
    if(data.rental_id != ''){
      this.rentalsService.get(data.rental_id).subscribe((res: any) => {
        if(res.type == 1){
          res.quantity = res.quantity + 1;
          const dataUpdate = {quantity: res.quantity};
          this.rentalsService.update(data.rental_id, dataUpdate).subscribe((res) => {});
        }
      });
    }

    this.rentalRoomsService.create(data).subscribe(
      (res) => {
        this.resetForm();
        this.toastrService.success(res.message);
      },
      (error) => {
        this.toastrService.error(error.message);
      }
    );
  }
  resetForm(): void {
    this.submitted = false;
    this.roomForm = this.fb.group({
      name: [''],
      price: [''],
      area: [''],
      numberPeople: [''],
      vacancyDate: [''],
      note: [''],
      status: [''],
      rentalId: [''],
    });
  }
}
