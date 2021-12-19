import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { CustomersService } from 'src/app/services/customers.service';
import { ActivatedRoute } from '@angular/router';
import { PremiumService } from 'src/app/models/premium-service.model';
import { PremiumServiceService } from 'src/app/services/premium-service.service';
import { PaymentService } from 'src/app/services/payment.service';
import {formatNumber, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DatePipe } from '@angular/common';
registerLocaleData(localeFr, 'fr');


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  id: any;
  idPremium: any;
  submitted = false;
  premium?: PremiumService | undefined;
  price: any;
  priceCus: any;
  name: any;
  expire = 1;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private toastrService: ToastrService,
    private customSer: CustomersService,
    private route: ActivatedRoute,
    private premiumSer: PremiumServiceService,
    private paymentService: PaymentService,
    private datePipe: DatePipe
  ) {}

  infoCus = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    firstName: ['', Validators.compose([Validators.required])],
    lastName: ['', Validators.compose([Validators.required])],
    phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9 ]{10}')])],
  });

  ngOnInit(): void {
    this.id = localStorage.getItem('currentUser');
    this.idPremium = this.route.snapshot.paramMap.get('id');

    this.customSer.get(this.id).subscribe((res) => {
      let user = res;
      this.infoCus = this.fb.group({
        email: [user.email, Validators.compose([Validators.required, Validators.email])],
        firstName: [user.firstName, Validators.compose([Validators.required])],
        lastName: [user.lastName, Validators.compose([Validators.required])],
        phone: [user.phone, Validators.compose([Validators.required, Validators.pattern('[0-9 ]{10}')])],
      });
    });

    this.premiumSer.get(this.idPremium).subscribe(
      (data: any) => {
        this.premium = data;
        this.name = data.name;
        this.price = data.price;
        this.priceCus = data.price;
      },
      (err) => {
        console.log(err);
      }
    );

  }

  get f() {
    return this.infoCus.controls;
  }

  onChange(event: any): void {
    this.expire = event.target.value;
    this.price = this.priceCus * event.target.value;
  }

  onSubmit(): any {
    this.submitted = true;
    if (this.infoCus.invalid) {
      return false;
    }
    const dataUpdate = {
      first_name: this.infoCus.value['firstName'],
      last_name: this.infoCus.value['lastName'],
      phone: this.infoCus.value['phone'],
    };
    this.customSer.update(this.id, dataUpdate).subscribe(
      (response) => {
        this.submitted = true;
        const name = this.infoCus.value['firstName']+' '+this.infoCus.value['lastName'];
        this.customSer.profileName$.next(name);
      },
      (error) => {
        this.toastrService.success(error.message);
      });
    const dateNow = this.datePipe.transform(new Date(),"dd-MM-yyyy");
    const data = {
      amount: this.price,
      bankCode: "NCB",
      orderDescription: 'Thanh toan don hang thoi gian: ' + dateNow,
      orderType: "billpayment",
      language: "vn"
    }
    let bill = {
      premium_id: this.idPremium,
      expire: this.expire,
    }
    localStorage.setItem('bill', JSON.stringify(bill));
    this.paymentService.payment(data).subscribe(
      (res) => {
        window.location.href = res.vnpUrl;
      },
    (error) => {
      console.log(error);
    });
  }
}
