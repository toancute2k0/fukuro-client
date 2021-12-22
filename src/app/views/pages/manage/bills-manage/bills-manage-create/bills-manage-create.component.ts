import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import {RentalsService} from "../../../../../services/rentals.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {RentalRoomsService} from "../../../../../services/rental-rooms.service";
import {RentersService} from "../../../../../services/renters.service";
import {RentalBillsService} from "../../../../../services/rental-bills.service";

@Component({
  selector: 'app-bills-manage-create',
  templateUrl: './bills-manage-create.component.html',
  styleUrls: ['./bills-manage-create.component.css'],
})
export class BillsManageCreateComponent implements OnInit {
  id: any;
  limit = 6;
  limit2 = 6;
  rentals: any;
  rooms: any;
  submitted = false;
  isRoom = 0;
  billForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    price: ['', Validators.compose([Validators.required, Validators.minLength(0),Validators.pattern(/^\d+$/)])],
    electricityStart: ['', Validators.compose([Validators.required, Validators.minLength(0),Validators.pattern(/^\d+$/)])],
    electricityEnd: ['', Validators.compose([Validators.required, Validators.minLength(0),Validators.pattern(/^\d+$/)])],
    electricityQuantity: [''],
    electricityAmount: [''],
    electricityPrice: ['', Validators.compose([Validators.required, Validators.minLength(0),Validators.pattern(/^\d+$/)])],
    waterStart: ['', Validators.compose([Validators.required, Validators.minLength(0),Validators.pattern(/^\d+$/)])],
    waterEnd: ['', Validators.compose([Validators.required, Validators.minLength(0),Validators.pattern(/^\d+$/)])],
    waterQuantity: [''],
    waterAmount: [''],
    waterPrice: ['', Validators.compose([Validators.required, Validators.minLength(0),Validators.pattern(/^\d+$/)])],
    internetFee: [''],
    otherFee: [''],
    feeDesc: [''],
    prepay: ['', Validators.compose([Validators.minLength(0),Validators.pattern(/^\d+$/)])],
    discountPrice: ['', Validators.compose([Validators.minLength(0),Validators.pattern(/^\d+$/)])],
    totalPrice: [''],
    note: [''],
    status: ['', Validators.compose([Validators.required])],
    rentalId: [''],
    rentalRoomId: [''],
    customerId: [''],
  });

  constructor(
    private fb: FormBuilder,
    private rentalsService: RentalsService,
    private _router: Router,
    private toastrService: ToastrService,
    private rentalRoomsService: RentalRoomsService,
    private rentersService: RentersService,
    private rentalBillsService: RentalBillsService
  ) {}

  get f() {
    return this.billForm.controls;
  }
  ngOnInit(): void {
    this.rentals = [];
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
          if(data['count'] > 0){
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
          }
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
          this.billForm.patchValue({price: item.price});
          this.retrieveRoomsByRentalId(item.id);
        }
        if(item.id == event.target.value && item.type > 1){
          this.billForm.patchValue({price: item.price});
          this.billForm.value['rentalRoomId'] = '';
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

  electricityChange(){
    if(this.billForm.value['electricityEnd']  - this.billForm.value['electricityStart'] > 0){
      this.billForm.patchValue({electricityQuantity: this.billForm.value['electricityEnd'] - this.billForm.value['electricityStart']});
      if(this.billForm.value['electricityPrice'] > 0){
        const amount = this.billForm.value['electricityPrice'] * (this.billForm.value['electricityEnd']  - this.billForm.value['electricityStart']);
        this.billForm.patchValue({electricityAmount: amount});
      }
    }else{
      this.billForm.patchValue({electricityQuantity: 0, electricityAmount: 0});
    }
  }

  electricityMoney(){
    if(this.billForm.value['electricityQuantity'] > 0){
      this.billForm.patchValue({electricityAmount: this.billForm.value['electricityQuantity'] * this.billForm.value['electricityPrice']});
    }else{
      this.billForm.patchValue({electricityAmount: 0});
    }
  }

  waterChange(){
    if(this.billForm.value['waterEnd']  - this.billForm.value['waterStart'] > 0){
      this.billForm.patchValue({waterQuantity: this.billForm.value['waterEnd'] - this.billForm.value['waterStart']});
      if(this.billForm.value['waterPrice'] > 0){
        const amount = this.billForm.value['waterPrice'] * (this.billForm.value['waterEnd']  - this.billForm.value['waterStart']);
        this.billForm.patchValue({waterAmount: amount});
      }
    }else{
      this.billForm.patchValue({waterQuantity: 0, waterAmount: 0});
    }
  }

  waterMoney(){
    if(this.billForm.value['waterQuantity'] > 0){
      this.billForm.patchValue({waterAmount: this.billForm.value['waterQuantity'] * this.billForm.value['waterPrice']});
    }else{
      this.billForm.patchValue({waterAmount: 0});
    }
  }

  onSubmit(): any {
    this.submitted = true;

    if (this.billForm.invalid) {
      return false;
    }

    this.billForm.value['totalPrice']= Number(this.billForm.value['totalPrice']);
    this.billForm.value['totalPrice'] =
      (
        Number(this.billForm.value['price']) +
        Number(this.billForm.value['electricityAmount']) +
        Number(this.billForm.value['waterAmount'] )
      );
    if(this.billForm.value['internetFee'] != '' ){
      this.billForm.value['totalPrice'] += Number(this.billForm.value['internetFee']);
    }
    if(this.billForm.value['otherFee'] != '' ){
      this.billForm.value['totalPrice'] += Number(this.billForm.value['otherFee']);
    }
    if(this.billForm.value['prepay'] != '' ){
      this.billForm.value['totalPrice'] -= Number(this.billForm.value['prepay']);
    }
    if(this.billForm.value['discountPrice'] != '' ){
      this.billForm.value['totalPrice'] = this.billForm.value['totalPrice'] - (this.billForm.value['totalPrice'] * Number(this.billForm.value['discountPrice']) / 100);
    }

    const data = {
      name: this.billForm.value['name'],
      price: this.billForm.value['price'],
      electricity_quantity: this.billForm.value['electricityQuantity'],
      electricity_price: this.billForm.value['electricityPrice'],
      water_quantity: this.billForm.value['waterQuantity'],
      water_price: this.billForm.value['waterPrice'],
      internet_fee: this.billForm.value['internetFee'],
      other_fee: this.billForm.value['otherFee'],
      fee_desc: this.billForm.value['feeDesc'],
      prepay: this.billForm.value['prepay'],
      discount_price: this.billForm.value['discountPrice'],
      total_price: this.billForm.value['totalPrice'],
      note: this.billForm.value['note'],
      status: this.billForm.value['status'],
      rental_id: this.billForm.value['rentalId'],
      rental_room_id: this.billForm.value['rentalRoomId'],
      customer_id: localStorage.getItem('currentUser'),
    }
    this.rentalsService.get(data.rental_id)
      .subscribe(
        (res: any) => {
          if(res.type != 1){
            data.rental_room_id = null;
          }
          this.rentalBillsService.create(data).subscribe(
            (res) => {
              // this.resetForm();
              this._router.navigate(['/manage/bills/list']);
              this.toastrService.success('Thêm mới thành công!');
            },
            (error) => {
              this.toastrService.error('Thêm mới thất bại!');
            }
          );
        });
  }
  resetForm(): void {
    this.submitted = false;
    this.billForm = this.fb.group({
      name: [''],
      price: [''],
      electricityStart: [''],
      electricityEnd: [''],
      electricityQuantity: [''],
      electricityAmount: [''],
      electricityPrice: [''],
      waterStart: [''],
      waterEnd: [''],
      waterQuantity: [''],
      waterAmount: [''],
      waterPrice: [''],
      internetFee: [''],
      otherFee: [''],
      feeDesc: [''],
      prepay: [''],
      discountPrice: [''],
      totalPrice: [''],
      note: [''],
      status: [''],
      rentalId: [''],
      rentalRoomId: [''],
      customerId: [''],
    });
  }
}
