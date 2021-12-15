import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RentalRoomsService} from "../../../../../services/rental-rooms.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {RentalsService} from "../../../../../services/rentals.service";

@Component({
  selector: 'app-rooms-manage-edit',
  templateUrl: './rooms-manage-edit.component.html',
  styleUrls: ['./rooms-manage-edit.component.css'],
})
export class RoomsManageEditComponent implements OnInit {
  submitted = false;
  roomForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    price: ['', Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
    area: ['', Validators.compose([Validators.required])],
    numberPeople: ['', Validators.compose([Validators.required])],
    vacancyDate: ['', Validators.compose([Validators.required])],
    note: [''],
    status: [1],
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
    private activatedRoute: ActivatedRoute,
  ) {

  }
  get f() {
    return this.roomForm.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getData(this.id);
    const userId = localStorage.getItem('currentUser');
    if (this.id) {
      this.retrieveRentalsByCustomerId(userId);
    }
  }
  getData(id: any): void {
    this.rentalRoomsService.get(id)
      .subscribe(
        (data: any) => {
          this.roomForm = this.fb.group({
            name: [data.name, Validators.compose([Validators.required])],
            price: [data.price, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
            area: [data.area, Validators.compose([Validators.required])],
            numberPeople: [data.numberPeople, Validators.compose([Validators.required])],
            vacancyDate: [data.vacancyDate, Validators.compose([Validators.required])],
            note: [data.note],
            status: [data.status],
            rentalId: [data.rentalId, Validators.compose([Validators.required])],
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
    this.rentalRoomsService.update(this.id, data).subscribe(
      (res: any) => {
        this.toastrService.success(res.message);
      },
      (error: any) => {
        this.toastrService.error(error.message);
      }
    );
  }


}
