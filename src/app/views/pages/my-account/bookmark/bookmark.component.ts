import { Component, OnInit } from '@angular/core';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { CustomersService } from 'src/app/services/customers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
})
export class BookmarkComponent implements OnInit {
  linkImg = environment.linkImg;
  bookMark?: any[] | null;
  bookMarkLength?: number;
  id: any;
  constructor(
    private bookMarkSer: BookmarksService,
    private customSer: CustomersService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('currentUser');
    if (id) {
      this.getById(id);
      this.getAllBookMark(id);
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
      this.getAllBookMark(this.id);
    });
  }

  getAllBookMark(id: string): void {
    this.bookMarkSer.getAllCus(id).subscribe(
      (data: any) => {
        this.bookMark = data;
        this.bookMarkLength = data.length - 1;
        for (var i = 0; i < data.length; i++) {
          data[i].image = JSON.parse(data[i].image);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleRemoveFromWishlist(id: string) {
    const data = {
      rental_news: id.toString(),
    };
    this.bookMarkSer.updateBookMark(this.id, data).subscribe(() => {
      this.getAllBookMark(this.id);
    });
    if (this.bookMarkLength == 0) {
      this.deleteCusById();
    }
  }

  deleteCusById() {
    this.bookMarkSer.deleteCusById(this.id).subscribe(() => {
      this.bookMark = null;
    });
  }
}
