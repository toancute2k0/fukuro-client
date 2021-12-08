import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { CustomersService } from 'src/app/services/customers.service';
import { ActivatedRoute } from '@angular/router';
import { PremiumBillsService } from 'src/app/services/premium-bills.service';
import { PaymentService } from 'src/app/services/payment.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DatePipe } from '@angular/common';
import {PremiumServiceService} from "../../../../services/premium-service.service";
registerLocaleData(localeFr, 'fr');


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  bill: any;
  dateNow: any;
  name: any;
  flag = false;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private toastrService: ToastrService,
    private customSer: CustomersService,
    private route: ActivatedRoute,
    private premiumBillsSer: PremiumBillsService,
    private paymentService: PaymentService,
    private datePipe: DatePipe,
    private premiumSer: PremiumServiceService,
  ) {}

  ngOnInit(): void {
    this.paymentService.result().subscribe(
      (res) => {
        this.bill = JSON.parse(localStorage.getItem('bill') || '{}');
        if (JSON.stringify(this.bill) != '{}') {
          this.dateNow = this.datePipe.transform(new Date(), "dd-MM-yyyy");
          let createBill = {
            name: 'Hóa đơn thanh toán dịch vụ premium',
            price: this.bill.price,
            expire: this.bill.expire,
            total_price: this.bill.total_price,
            payment_status: 1,
            status: 0,
            customer_id: this.bill.customer_id,
            premium_id: this.bill.premium_id,
          }
          this.premiumBillsSer.create(createBill).subscribe(
            (res) => {
              this.flag = true;
              localStorage.removeItem('bill');
            }, (error) => {
              console.log(error);
            });
        }
        else{
          this.flag = false;
        }
        },
      (error) => {
        console.log(error);
      });
  }
}
