import { Component, OnInit } from '@angular/core';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
})
export class BookmarkComponent implements OnInit {
  linkImg = environment.linkImg;
  bookMark?: any[];
  constructor(private bookMarkSer: BookmarksService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('currentUser');
    if (id) {
      this.getAllBookMark(id);
    }
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

  getAllBookMark(id: string): void {
    this.bookMarkSer.getAllCus(id).subscribe(
      (data: any) => {
        this.bookMark = data;
        for (var i = 0; i < data.length; i++) {
          data[i].image = JSON.parse(data[i].image);
        }
        console.log(this.bookMark);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleRemoveFromWishlist(id: string) {
    // const _id = localStorage.getItem('currentUser');
    // const data = {
    //   rental_news: id.toString(),
    // };
    // this.bookMarkSer.updateBookMark(_id, data).subscribe((res) => {
    //   this.getAllBookMark('_id');
    // });
  }
}
