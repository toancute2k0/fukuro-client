import { Component, OnInit } from '@angular/core';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { RentalNewsService } from 'src/app/services/rental-news.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from '../../../services/customers.service';

@Component({
  selector: 'app-featured-property',
  templateUrl: './featured-property.component.html',
  styleUrls: ['./featured-property.component.css'],
})
export class FeaturedPropertyComponent implements OnInit {
  rentalNews: any | undefined;
  id: any;
  linkImg = environment.linkImg;
  wishlist = [];
  constructor(
    private rentalNewsService: RentalNewsService,
    private bookmarkSer: BookmarksService,
    public auth: AuthService,
    private customSer: CustomersService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('currentUser');
    if (id) {
      this.getById(id);
    }
    this.customSer.profileId$.subscribe((profileId) => (this.id = profileId));
    this.getRentalNews();
  }

  getById(id: string): void {
    this.customSer.get(id).subscribe((res: any) => {
      this.id = res['id'];
      this.getWishlist();
    });
  }

  getWishlist() {
    this.bookmarkSer.getAllCus(this.id).subscribe(
      (data: any) => {
        this.wishlist = data;
        this.getRentalNews();
      },
      (err: any | undefined) => {
        console.log(err);
      }
    );
  }
  getRentalNews() {
    this.rentalNewsService.getLatest().subscribe(
      (data: any | undefined) => {
        this.rentalNews = data['rows'];
        for (var i = 0; i < data['rows'].length; i++) {
          data['rows'][i].image = JSON.parse(data['rows'][i].image);
        }
        if (this.wishlist) {
          for (let item of this.rentalNews) {
            item.wishlist = false;
            for (var i = 0; i < this.wishlist.length; i++) {
              if (item.id == this.wishlist[i]['id']) {
                item.wishlist = true;
              }
            }
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleAddToWishlist(id: string) {
    const data = {
      rental_news: id,
    };
    this.bookmarkSer.updateBookMark(this.id, data).subscribe(() => {
      this.getWishlist();
    });
  }

  handleRemoveFromWishlist(id: string) {
    const data = {
      rental_news: id.toString(),
    };
    this.bookmarkSer.updateBookMark(this.id, data).subscribe(() => {
      this.getWishlist();
    });
  }
}
