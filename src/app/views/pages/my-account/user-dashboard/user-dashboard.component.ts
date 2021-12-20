import { Component, OnInit } from '@angular/core';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { CustomersService } from 'src/app/services/customers.service';
import { PremiumBillsService } from 'src/app/services/premium-bills.service';
import { RentalNewsService } from 'src/app/services/rental-news.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  bookMarkLength?: number;
  rentalLength?: number;
  createCus?: string;
  premiumBill?: number;
  id: any;

  constructor(
    private bookMarkSer: BookmarksService,
    private customSer: CustomersService,
    private rentalNewsService: RentalNewsService,
    private preService: PremiumBillsService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('currentUser');
    if (id) {
      this.getById(id);
      this.getAllBookMark(id);
      this.getPremiumBill(id);
    }
    this.customSer.profileId$.subscribe((profileId) => (this.id = profileId));
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

  getById(id: string): void {
    this.customSer.get(id).subscribe((res: any) => {
      this.id = res['id'];
      this.createCus = res.createdAt;
      this.getAllBookMark(this.id);

      this.rentalNewsService.getfindByCustomerId(this.id).subscribe(
        (data: any | undefined) => {
          this.rentalLength = data['rows'].length;
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  getAllBookMark(id: string): void {
    this.bookMarkSer.getAllCus(id).subscribe(
      (data: any) => {
        this.bookMarkLength = data.length;
        // console.log(this.bookMarkLength);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPremiumBill(id: string): void {
    this.preService.getByCustomerId(id).subscribe((res: any | undefined) => {
      this.premiumBill = res['rows'].length;
      // console.log(this.premiumBill);
    });
  }
}
