import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RentalsService } from '../../../../../services/rentals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalRoomsService } from '../../../../../services/rental-rooms.service';
import { RentersService } from '../../../../../services/renters.service';
import { RentalBillsService } from '../../../../../services/rental-bills.service';

@Component({
  selector: 'app-bills-manage-edit',
  templateUrl: './bills-manage-edit.component.html',
  styleUrls: ['./bills-manage-edit.component.css'],
})
export class BillsManageEditComponent implements OnInit {
  id: any;
  currentUser: any;
  limit = 6;
  limit2 = 6;
  rentals: any;
  rooms: any;
  submitted = false;
  isRoom = 0;
  billForm = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    price: [
      '',
      Validators.compose([Validators.required, Validators.pattern(/^\d+$/)]),
    ],
    electricityStart: [
      '',
      Validators.compose([Validators.required, Validators.pattern(/^\d+$/)]),
    ],
    electricityEnd: [
      '',
      Validators.compose([Validators.required, Validators.pattern(/^\d+$/)]),
    ],
    electricityQuantity: [''],
    electricityAmount: [''],
    electricityPrice: [
      '',
      Validators.compose([Validators.required, Validators.pattern(/^\d+$/)]),
    ],
    waterStart: [
      '',
      Validators.compose([Validators.required, Validators.pattern(/^\d+$/)]),
    ],
    waterEnd: [
      '',
      Validators.compose([Validators.required, Validators.pattern(/^\d+$/)]),
    ],
    waterQuantity: [''],
    waterAmount: [''],
    waterPrice: [
      '',
      Validators.compose([Validators.required, Validators.pattern(/^\d+$/)]),
    ],
    internetFee: [''],
    otherFee: [''],
    feeDesc: [''],
    prepay: ['', Validators.compose([Validators.pattern(/^\d+$/)])],
    discountPrice: ['', Validators.compose([Validators.pattern(/^\d+$/)])],
    totalPrice: [''],
    note: [''],
    status: ['', Validators.compose([Validators.required])],
    rentalId: ['', Validators.compose([Validators.required])],
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
    private rentalBillsService: RentalBillsService,
    private activatedRoute: ActivatedRoute
  ) {}

  get f() {
    return this.billForm.controls;
  }
  ngOnInit(): void {
    this.rooms = [];
    this.rentals = [];
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.retrieveRentalsByCustomerId(this.currentUser);
    }
    this.id = this.activatedRoute.snapshot.params.id;
    this.getData(this.id);
  }

  getData(id: any): void {
    this.rentalBillsService.get(id).subscribe(
      (data: any) => {
        this.billForm = this.fb.group({
          name: [data.name, Validators.compose([Validators.required])],
          price: [
            data.price,
            Validators.compose([
              Validators.required,
              Validators.pattern(/^\d+$/),
            ]),
          ],
          electricityQuantity: [data.electricityQuantity],
          electricityAmount: [data.electricityQuantity * data.electricityPrice],
          electricityPrice: [
            data.electricityPrice,
            Validators.compose([
              Validators.required,
              Validators.pattern(/^\d+$/),
            ]),
          ],
          waterQuantity: [data.waterQuantity],
          waterAmount: [data.waterQuantity * data.waterPrice],
          waterPrice: [
            data.waterPrice,
            Validators.compose([
              Validators.required,
              Validators.pattern(/^\d+$/),
            ]),
          ],
          internetFee: [data.internetFee],
          otherFee: [data.otherFee],
          feeDesc: [data.feeDesc],
          prepay: [
            data.prepay,
            Validators.compose([Validators.pattern(/^\d+$/)]),
          ],
          discountPrice: [
            data.discountPrice,
            Validators.compose([Validators.pattern(/^\d+$/)]),
          ],
          totalPrice: [data.totalPrice],
          note: [data.note],
          status: [data.status, Validators.compose([Validators.required])],
          rentalId: [data.rentalId, Validators.compose([Validators.required])],
          rentalRoomId: [data.rentalRoomId],
        });
        this.rentalsService.get(data.rentalId).subscribe((data: any) => {
          if (data.type == 1) {
            this.isRoom = 1;
            this.retrieveRoomsByRentalId(data.rentalId);
          }
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  retrieveRentalsByCustomerId(id: any): void {
    this.rentalsService.getFindByCustomerId(id, this.limit).subscribe(
      (data: any) => {
        this.limit = data['count'];
        this.rentalsService
          .getFindByCustomerId(id, this.limit)
          .subscribe((res: any) => {
            for (let item of res['rows']) {
              if (item.type != 1 || (item.type == 1 && item.quantity > 0)) {
                this.rentals.push(item);
              }
            }
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  change(event: any) {
    if (event.target.value != '') {
      for (let item of this.rentals) {
        if (item.id == event.target.value && item.type == 1) {
          this.isRoom = 1;
          this.billForm.patchValue({ price: item.price });
          this.retrieveRoomsByRentalId(item.id);
        }
        if (item.id == event.target.value && item.type > 1) {
          this.billForm.patchValue({ price: item.price });
          this.billForm.value['rentalRoomId'] = '';
          this.isRoom = 0;
        }
      }
    } else {
      this.billForm.patchValue({ price: '' });
      this.billForm.value['rentalRoomId'] = '';
      this.isRoom = 0;
    }
  }

  retrieveRoomsByRentalId(id: any): void {
    this.rentalRoomsService.getFindByRentalId(id, this.limit2).subscribe(
      (data: any) => {
        this.limit2 = data['count'];
        this.rentalRoomsService
          .getFindByRentalId(id, this.limit2)
          .subscribe((res: any) => {
            this.rooms = res['rows'];
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(): any {
    this.submitted = true;

    if (this.billForm.invalid) {
      return false;
    }

    this.billForm.value['totalPrice'] = Number(
      this.billForm.value['totalPrice']
    );
    this.billForm.value['totalPrice'] =
      Number(this.billForm.value['price']) +
      Number(this.billForm.value['electricityAmount']) +
      Number(this.billForm.value['waterAmount']);
    if (this.billForm.value['internetFee'] != '') {
      this.billForm.value['totalPrice'] += Number(
        this.billForm.value['internetFee']
      );
    }
    if (this.billForm.value['otherFee'] != '') {
      this.billForm.value['totalPrice'] += Number(
        this.billForm.value['otherFee']
      );
    }
    if (this.billForm.value['prepay'] != '') {
      this.billForm.value['totalPrice'] -= Number(
        this.billForm.value['prepay']
      );
    }
    if (this.billForm.value['discountPrice'] != '') {
      this.billForm.value['totalPrice'] =
        this.billForm.value['totalPrice'] -
        (this.billForm.value['totalPrice'] *
          Number(this.billForm.value['discountPrice'])) /
          100;
    }

    const data = {
      name: this.billForm.value['name'],
      price: this.billForm.value['price'],
      internetFee: this.billForm.value['internetFee'],
      otherFee: this.billForm.value['otherFee'],
      feeDesc: this.billForm.value['feeDesc'],
      prepay: this.billForm.value['prepay'],
      discountPrice: this.billForm.value['discountPrice'],
      totalPrice: this.billForm.value['totalPrice'],
      note: this.billForm.value['note'],
      status: this.billForm.value['status'],
      rentalId: this.billForm.value['rentalId'],
      rentalRoomId: this.billForm.value['rentalRoomId'],
    };
    // console.log(data);
    this.rentalsService.get(data.rentalId).subscribe((res: any) => {
      if (res.type != 1) {
        data.rentalRoomId = null;
      }
      this.rentalBillsService.update(this.id, data).subscribe(
        (res: any) => {
          this.toastrService.success(res.message);
        },
        (error: any) => {
          this.toastrService.error(error.message);
        }
      );
    });
  }
}
