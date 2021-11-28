import { Component, OnInit } from '@angular/core';
import { RentalNews } from '../../../../models/rental-news.model';
import { RentalNewsService } from '../../../../services/rental-news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-motel-list',
  templateUrl: './motel-list.component.html',
  styleUrls: ['./motel-list.component.css'],
})
export class MotelListComponent implements OnInit {
  linkImg = environment.linkImg;
  page = 1;
  length = 8;
  count = 8;
  rentalNews: any | undefined;
  public isMobile = false;

  constructor(private rentalNewsService: RentalNewsService) {}

  ngOnInit(): void {
    this.rentalNewsService.getAll(this.page, this.count).subscribe(
      (data: any | undefined) => {
        this.count = data['count'];
        this.getData(1, this.count);
      },
      (err) => {
        console.log(err);
      }
    );
    window.onresize = () => (this.isMobile = window.innerWidth <= 768);
  }
  getData(n: any, c: any): void {
    this.rentalNewsService.getAll(n, c).subscribe(
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
  }
}
