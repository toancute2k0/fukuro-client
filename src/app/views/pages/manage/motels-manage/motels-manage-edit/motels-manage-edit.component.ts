import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RentalsService} from "../../../../../services/rentals.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-motels-manage-edit',
  templateUrl: './motels-manage-edit.component.html',
  styleUrls: ['./motels-manage-edit.component.css'],
})
export class MotelsManageEditComponent implements OnInit {
  id: any;
  submitted = false;
  rentalForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    price: ['', Validators.compose([Validators.required])],
    quantity: [0],
    type: ['', Validators.compose([Validators.required])],
    address: ['', Validators.compose([Validators.required])],
    note: [''],
    status: [1],
  });
  constructor(
    private fb: FormBuilder,
    private rentalsService: RentalsService,
    private _router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {

  }
  get f() {
    return this.rentalForm.controls;
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getData(this.id);
  }

  getData(id: any): void {
    this.rentalsService.get(id)
      .subscribe(
        (data: any) => {
          this.rentalForm = this.fb.group({
            name: [data.name, Validators.compose([Validators.required]),],
            price: [data.price, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
            quantity: [data.quantity],
            type: [data.type, Validators.compose([Validators.required]),],
            address: [data.address, Validators.compose([Validators.required])],
            note: [data.note],
            status: [data.status],
          });
        },
        (error: any) => {
          console.log(error);
        });
  }

  onSubmit(): any {
    this.submitted = true;

    if (this.rentalForm.invalid) {
      return false;
    }
    const data = {
      name: this.rentalForm.value['name'],
      price: this.rentalForm.value['price'],
      quantity: this.rentalForm.value['quantity'],
      type: this.rentalForm.value['type'],
      address: this.rentalForm.value['address'],
      note: this.rentalForm.value['note'],
      status: this.rentalForm.value['status']
    };
    this.rentalsService.update(this.id, data).subscribe(
      (res: any) => {
        this.toastrService.success(res.message);
      },
      (error: any) => {
        this.toastrService.error(error.message);
      }
    );
  }

}
