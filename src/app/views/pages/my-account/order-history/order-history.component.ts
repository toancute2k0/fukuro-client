import { Component, OnInit } from '@angular/core';
import { PremiumBills } from 'src/app/models/premium-bills.model';
import { PremiumBillsService } from 'src/app/services/premium-bills.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  premiumBill?: PremiumBills[];

  constructor(private preService: PremiumBillsService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('currentUser');

    if (id) {
      this.getById(id);
    }
  }

  getById(id: string): void {
    this.preService.getById(id).subscribe((res: any | undefined) => {
      this.premiumBill = res['rows'];
      console.log(this.premiumBill);
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
