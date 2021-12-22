import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { PremiumBillsService } from 'src/app/services/premium-bills.service';
import { PremiumServiceService } from 'src/app/services/premium-service.service';

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
    private customSer: CustomersService,
    private premiumServiceService: PremiumServiceService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.getId(id);
  }

  getId(id: string): void {
    this.billSer.get(id).subscribe((res: any | undefined) => {
      this.premiumBill = res;

      this.customSer.get(res.customerId).subscribe((cus: any | undefined) => {
        this.customer = cus;
      });
      this.premiumServiceService
        .get(res.premiumId)
        .subscribe((data: any | undefined) => {
          this.premium = data['rows'][0].name;
        });
    });
  }

  openFilterSearch() {
    let textArea = document.getElementById(
      'filter_search'
    ) as HTMLTextAreaElement;
    if (textArea.style.display == 'none') {
      textArea.style.display = 'block';
    } else {
      textArea.style.display = 'none';
    }
  }
}
