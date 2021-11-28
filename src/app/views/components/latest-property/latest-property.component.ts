import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
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

  constructor(private rentalNewsService: RentalNewsService) {}

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
    this.rentalNewsService.getPriority(6).subscribe(
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
