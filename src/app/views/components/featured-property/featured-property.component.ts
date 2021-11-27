import { Component, OnInit } from '@angular/core';
import { Bookmarks } from 'src/app/models/bookmarks.model';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { RentalNewsService } from 'src/app/services/rental-news.service';

@Component({
  selector: 'app-featured-property',
  templateUrl: './featured-property.component.html',
  styleUrls: ['./featured-property.component.css'],
})
export class FeaturedPropertyComponent implements OnInit {
  rentalNews: any | undefined;
  // wishList?: Bookmarks[];
  constructor(
    private rentalNewsService: RentalNewsService,
    private bookmarkSer: BookmarksService
  ) {}

  ngOnInit(): void {
    this.rentalNewsService.getLatest().subscribe(
      (data: any | undefined) => {
        this.rentalNews = data['rows'];
        for (var i = 0; i < data['rows'].length; i++) {
          data['rows'][i].image = JSON.parse(data['rows'][i].image);
        }
      },
      (err) => {
        console.log(err);
      }
    );

    this.wishList();
  }

  wishList(): void {
    this.bookmarkSer.updateBookMark(1, 21).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
