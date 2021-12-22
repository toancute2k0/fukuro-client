import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RentalsService} from "../../../../../services/rentals.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-motels-manage-create',
  templateUrl: './motels-manage-create.component.html',
  styleUrls: ['./motels-manage-create.component.css'],
})
export class MotelsManageCreateComponent implements OnInit {
  submitted = false;
  isRentals = false;
  rentalForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    price: ['', Validators.compose([Validators.pattern(/^\d+$/)])],
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
    private toastrService: ToastrService
  ) {}

  get f() {
    return this.rentalForm.controls;
  }
  ngOnInit(): void {
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
      status: this.rentalForm.value['status'],
      customer_id: localStorage.getItem('currentUser'),
    };
    this.rentalsService.create(data).subscribe(
      (res) => {
        this.resetForm();
        this.toastrService.success('Thêm mới thành công!');
      },
      (error) => {
        this.toastrService.error('Thêm mới thất bại!');
      }
    );
  }
  change(event: any){
    if(event.target.value == 1){
      this.isRentals = true;
      this.rentalForm.value['price'] = 0;
    }else{
      this.isRentals = false;
    }
  }

  resetForm(): void {
    this.submitted = false;
    this.rentalForm = this.fb.group({
      name: [''],
      price: [''],
      quantity: [''],
      type: [''],
      address: [''],
      note: [''],
      area: [''],
      status: [''],
    });
  }

}
