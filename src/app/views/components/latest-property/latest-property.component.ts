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
    {
      id: '1',
      name: 'Phòng Trọ Có Nội Thất Nguyễn Văn Cừ',
      rent: 'Cho thuê',
      price: '1,500,000',
      address: 'Đường Nguyễn Văn Cừ,...',
      image:
        'https://cdn.chotot.com/oUcg3LgIaZ--qJpZKdVthrKZdyWgAq_83VWOHlzoAr8/preset:view/plain/83178c0a3a5653e0e4ba2f3dc27c2759-2745320048951484742.jpg',
    },
    {
      id: '2',
      name: 'Cho thuê phòng trọ có gác sạch đẹp có chổ nấu ăn',
      rent: 'Cho thuê',
      price: '1,000,000',
      address: 'Đường Nguyễn Văn Cừ,...',
      image:
        'https://cdn.chotot.com/BcMDFX9L-0SOHmft7GnAEOv0e20jJUFV0dYUWk7AtMQ/preset:view/plain/8939543a2129251f35cdbddb6d699026-2743064001693230152.jpg',
    },
    {
      id: '3',
      name: 'Còn trống 2 phòng có nội thất ở Nguyễn Văn Cừ',
      rent: 'Cho thuê',
      price: '2,800,000',
      address: 'Hẻm Liên Tổ 3-4, Nguyễn...',
      image:
        'https://cdn.chotot.com/LsbrCal51qnYpM0ZlSJCsKfwnSH931JzkH1Y8xwEoqQ/preset:view/plain/a76238dc7520b701bee4d11127c6314a-2744911947829195917.jpg',
    },
    {
      id: '4',
      name: 'Phòng trọ rộng cho nuôi chó mèo sau bến xe 91B',
      rent: 'Cho thuê',
      price: '1,900,000',
      address: 'Đường Nguyễn Văn Cừ,...',
      image:
        'https://cdn.chotot.com/QrvYjNyd9_F1cIMwVTlLWbJV6eKs5IlnnoP6emHxSaQ/preset:view/plain/005d83303feee47c3ec8658b9e5a43ba-2744531487351482244.jpg',
    },
    {
      id: '5',
      name: 'Cho thuê phòng trọ mặt tiền hẻm tổ 2 kdc 30',
      rent: 'Cho thuê',
      price: '1,500,000',
      address: 'Đường Nguyễn Văn Cừ,...',
      image:
        'https://cdn.chotot.com/Xt4i2gktrK-Q6tZhqF-FRjTiARHc9NfjLsU0Siz02uQ/preset:view/plain/ed24de24748b1ed2a5148943dba22318-2740977194293005680.jpg',
    },
    {
      id: '6',
      name: 'Phòng trọ mặt tiền khu cán bộ giảng viên',
      rent: 'Cho thuê',
      price: '3,500,000',
      address: 'Đường Nguyễn Văn Cừ,...',
      image:
        'https://cdn.chotot.com/oUcg3LgIaZ--qJpZKdVthrKZdyWgAq_83VWOHlzoAr8/preset:view/plain/83178c0a3a5653e0e4ba2f3dc27c2759-2745320048951484742.jpg',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
