import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-latest-property',
  templateUrl: './latest-property.component.html',
  styleUrls: ['./latest-property.component.css'],
})
export class LatestPropertyComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    dotsSpeed: 1000,
    smartSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplaySpeed: 1000,
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

  imagesList = [
    'assets/img/room/p-1.jpg',
    'assets/img/room/p-2.jpg',
    'assets/img/room/p-3.jpg',
    'assets/img/room/p-4.jpg',
    'assets/img/room/p-5.jpg',
    'assets/img/room/p-6.jpg',
    'assets/img/room/p-7.jpg',
  ];

  constructor() {}

  ngOnInit(): void {}
}
