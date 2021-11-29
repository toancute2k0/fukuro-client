import { Component, OnInit } from '@angular/core';
import { Bookmarks } from 'src/app/models/bookmarks.model';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { RentalNewsService } from 'src/app/services/rental-news.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-featured-property',
  templateUrl: './featured-property.component.html',
  styleUrls: ['./featured-property.component.css'],
})
export class FeaturedPropertyComponent implements OnInit {
  rentalNews: any | undefined;
  rentalNewsWl: any | undefined;
  linkImg = environment.linkImg;
  wishlist = [];
  constructor(
    private rentalNewsService: RentalNewsService,
    private bookmarkSer: BookmarksService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getWishlist();
    this.getRentalNews();
  }

  getWishlist() {
    this.bookmarkSer.getAll().subscribe(
      (data: any | undefined) => {
        var arr = data['rows'][0].rentalNews;
        var fields = arr.split(',');
        this.wishlist = fields;
        this.getRentalNews();
      },
      (err) => {
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
        for (let item of this.rentalNews) {
          item.wishlist = false;
          for (var i = 0; i < this.wishlist.length; i++) {
            if (item.id == this.wishlist[i]) {
              item.wishlist = true;
            }
          }
        }
        console.log(this.rentalNews);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleAddToWishlist(id: string) {
    const _id = localStorage.getItem('currentUser');
    const data = {
      rental_news: id,
    };
    this.bookmarkSer.updateBookMark(_id, data).subscribe((res) => {
      this.getWishlist();
    });
  }

  handleRemoveFromWishlist(id: string) {
    const _id = localStorage.getItem('currentUser');
    const data = {
      rental_news: id.toString(),
    };
    this.bookmarkSer.updateBookMark(_id, data).subscribe((res) => {
      this.getWishlist();
    });
  }
}
