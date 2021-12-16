import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { PremiumBillsService } from 'src/app/services/premium-bills.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  premiumBill: any = [];
  customer: any = [];
  premium?: string;

  constructor(
    private billSer: PremiumBillsService,
    private activatedRoute: ActivatedRoute,
    private customSer: CustomersService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.getId(id);
  }

  getId(id: string): void {
    this.billSer.getId(id).subscribe((res: any | undefined) => {
      this.premiumBill = res;

      this.customSer.get(res.customerId).subscribe((cus: any | undefined) => {
        this.customer = cus;
      });
      this.billSer
        .getPremiumId(res.premiumId)
        .subscribe((data: any | undefined) => {
          this.premium = data.name;
        });
    });
  }
}
