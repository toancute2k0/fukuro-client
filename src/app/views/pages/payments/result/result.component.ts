import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { CustomersService } from 'src/app/services/customers.service';
import { ActivatedRoute } from '@angular/router';
import { PremiumBillsService } from 'src/app/services/premium-bills.service';
import { PaymentService } from 'src/app/services/payment.service';
import {formatNumber, registerLocaleData} from '@angular/common';
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
  transactionCode: any;
  vnp_TransactionStatus = 0;
  currentUser: any;
  namePremium: any;
  nameBill: any;
  paymentStatus = 'Chưa thanh toán';
  pricePremium: any;

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
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.transactionCode = params.vnp_TransactionNo;
        if(params.vnp_TransactionStatus == '00'){
          this.vnp_TransactionStatus = 1;
        }
        }
      );
    this.currentUser = localStorage.getItem('currentUser');

    this.bill = JSON.parse(localStorage.getItem('bill') || '{}');
    if (JSON.stringify(this.bill) != '{}') {
      this.dateNow = this.datePipe.transform(new Date(), "dd-MM-yyyy");
      this.premiumSer.get(this.bill.premium_id).subscribe(
        (res) => {
          this.namePremium = res.name;
          if(this.vnp_TransactionStatus == 1){
            this.paymentStatus = 'Đã thanh toán';
          }
          let createBill = {
            name: 'Hóa đơn thanh toán dịch vụ Premium',
            price: res.price,
            expire: this.bill.expire,
            total_price: this.bill.expire * Number(res.price),
            payment_status: this.vnp_TransactionStatus,
            transaction_code: this.transactionCode,
            status: 0,
            customer_id: this.currentUser,
            premium_id: this.bill.premium_id,
          }
          this.nameBill = createBill.name;
          this.pricePremium = createBill.price;
          this.premiumBillsSer.create(createBill).subscribe(
            (res) => {
              this.flag = true;
              localStorage.removeItem('bill');
            }, (error) => {
              console.log(error);
            });
        }, (error) => {
          console.log(error);
        });
    }
    else{
      this.flag = false;
    }
  }
}
