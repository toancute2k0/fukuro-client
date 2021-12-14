import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { CustomersService } from 'src/app/services/customers.service';
import { RentalNewsService } from 'src/app/services/rental-news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-latest-property',
  templateUrl: './latest-property.component.html',
  styleUrls: ['./latest-property.component.css'],
})
export class LatestPropertyComponent implements OnInit {
  linkImg = environment.linkImg;
  rentalNews: any | undefined;
  id: any;
  wishlist = [];
  constructor(
    private rentalNewsService: RentalNewsService,
    private bookmarkSer: BookmarksService,
    public auth: AuthService,
    private customSer: CustomersService
  ) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    dotsSpeed: 1000,
    smartSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplaySpeed: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
  };

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
    this.rentalNewsService.getPriority(6).subscribe(
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
    this.bookmarkSer.updateBookMark(this.id, data).subscribe((res: any) => {
      if(res.message == 'empty'){
        for (let item of this.rentalNews) {
          item.wishlist = false;
        }
      }else{
        this.getWishlist();
      }
    });
  }
}
