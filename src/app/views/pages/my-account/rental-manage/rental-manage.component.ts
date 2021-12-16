import { Component, OnInit } from '@angular/core';
import { RentalNews } from 'src/app/models/rental-news.model';
import { RentalNewsService } from 'src/app/services/rental-news.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { CustomersService } from 'src/app/services/customers.service';
@Component({
  selector: 'app-rental-manage',
  templateUrl: './rental-manage.component.html',
  styleUrls: ['./rental-manage.component.css'],
})
export class RentalManageComponent implements OnInit {
  linkImg = environment.linkImg;
  rental: any | undefined;
  id: any;
  wishlist = [];
  constructor(
    private rentalNewsService: RentalNewsService,
    private toastrService: ToastrService,
    private bookmarkSer: BookmarksService,
    private customSer: CustomersService
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('currentUser');
    if (this.id) {
      this.getById(this.id);
    }
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
    this.rentalNewsService.getfindByCustomerId(this.id).subscribe(
      (data: any | undefined) => {
        this.rental = data['rows'];
        for (var i = 0; i < data['rows'].length; i++) {
          data['rows'][i].image = JSON.parse(data['rows'][i].image);
        }
        if (this.wishlist) {
          for (let item of this.rental) {
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
  deleteRentalNews(id: any) {
    if (window.confirm('Bạn có chắn chắn sẽ xoá không?')) {
      this.rentalNewsService.delete(id).subscribe(
        (response) => {
          this.getRentalNews();
          this.toastrService.success('Xóa tin cho thuê thành công ');
        },
        (error) => {
          this.toastrService.error(error);
        }
      );
    }
  }
  handleAddToWishlist(id: any) {
    const data = {
      rental_news: id.toString(),
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
      if (res.message == 'empty') {
        for (let item of this.rental) {
          item.wishlist = false;
        }
      } else {
        this.getWishlist();
      }
    });
  }
}
