import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { RentalNews } from '../../../../models/rental-news.model';
import { RentalNewsService } from '../../../../services/rental-news.service';
import { environment } from 'src/environments/environment';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-motel-list',
  templateUrl: './motel-list.component.html',
  styleUrls: ['./motel-list.component.css'],
})
export class MotelListComponent implements OnInit {
  linkImg = environment.linkImg;
  page = 1;
  count = 6;
  bySoft: any | undefined;
  ProdData: any[] = [];
  rentalNews: any | undefined;
  id: any;
  wishlist = [];
  infoName: any | undefined;
  infoPrice: any | undefined;
  infoSlug: any | undefined;
  infoImage: any | undefined;
  infoType: any | undefined;
  public isMobile = false;

  cp: number = 1;

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;
  center: any;
  position: any;
  zoom = 13;
  latitude?: number;
  longitude?: number;
  orderby = 'desc';
  countRt = 0;
  icon = {
    url: 'assets/img/marker.png',
    scaledSize: new google.maps.Size(40, 40), // scaled size
  };
  markersRepartidores: any = [];
  district?: any;
  submitted = false;

  constructor(
    private rentalNewsService: RentalNewsService,
    private bookmarkSer: BookmarksService,
    private fb: FormBuilder,
    public auth: AuthService,
    private customSer: CustomersService,
    private route: ActivatedRoute,
    private _router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Tìm thuê');
  }

  search = this.fb.group({
    search: [''],
  });

  data = {
    search: this.search.value['search'],
  };
  get f() {
    return this.search.controls;
  }

  openInfo(marker: MapMarker, content: any) {
    this.infoName = content.name;
    this.infoImage = content.image;
    this.infoPrice = content.price;
    this.infoSlug = content.slug;
    if (content.type == 1) {
      this.infoType = 'Nhà trọ';
    } else if (content.type == 2) {
      this.infoType = 'Mặt bằng';
    } else {
      this.infoType = 'Căn hộ';
    }
    this.info.open(marker);
  }

  ngOnInit(): void {
    this.rentalNews = [];
    const id = localStorage.getItem('currentUser');
    this.customSer.profileId$.subscribe((profileId) => (this.id = profileId));
    window.onresize = () => (this.isMobile = window.innerWidth <= 768);

    this.rentalNewsService
      .getAllDistrict()
      .subscribe((res: any | undefined) => {
        this.district = res['rows'];
        // console.log(res['rows']);
      });

    this.route.queryParams.subscribe((params) => {
      if (JSON.stringify(params) == '{}') {
        if (id != null) {
          this.getById(id);
        } else {
          this.getData(1, this.count, this.data);
        }
      } else {
        this.search.patchValue({ search: params['search'] });
        if (id != null) {
          this.getById(id);
        } else {
          this.data = {
            search: this.search.value['search'],
          };
          this.getData(1, this.count, this.data);
        }
      }
    });
  }

  searchOnchange(event: any) {
    this.rentalNewsService
      .getAllDistrict()
      .subscribe((res: any | undefined) => {
        this.district = res['rows'];
        this._router.navigate(['/thue-nha-dat/tim-kiem'], {
          queryParams: { search: res['rows'][event.target.value].district },
        });
        // console.log(res['rows'][event.target.value].district);
      });
  }

  sort(event: any) {
    switch (event.target.value) {
      case 'price': {
        this.ProdData = this.rentalNews.sort(
          (low: any, high: any) => low.price - high.price
        );
        break;
      }

      case 'price-desc': {
        this.ProdData = this.rentalNews.sort(
          (low: any, high: any) => high.price - low.price
        );
        break;
      }

      case 'create_asc': {
        this.ProdData = this.rentalNews.sort(
          (low: any, high: any) =>
            <any>new Date(low.createdAt) - <any>new Date(high.createdAt)
        );
        break;
      }

      default: {
        this.ProdData = this.rentalNews.sort(
          (low: any, high: any) =>
            <any>new Date(high.createdAt) - <any>new Date(low.createdAt)
        );
        break;
      }
    }
    return this.ProdData;
  }

  getData(n: any, c: any, data: any): void {
    this.rentalNewsService.getAll(n, c, this.orderby, data).subscribe(
      (data: any | undefined) => {
        // console.log(data);
        if (data['count'] > this.count) {
          this.rentalNewsService
            .getAll(n, data['count'], this.orderby, data)
            .subscribe(
              (res: any | undefined) => {
                this.countRt = res['count'];
                this.get(res['rows']);
              },
              (error: any | undefined) => {
                console.log(error);
              }
            );
        } else {
          this.countRt = data['count'];
          this.get(data['rows']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get(arr: any) {
    this.rentalNews = arr;
    this.markersRepartidores = [];
    for (let item of this.rentalNews) {
      item.image = JSON.parse(item.image);
      item.img = item.image[0];
      this.center = { lat: 10.0268531, lng: 105.7573112 };
      this.markersRepartidores.push({
        position: {
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lng),
        },
        label: { color: 'red' },
        title: item.name,
        data: {
          image: item.image[0],
          name: item.name,
          price: item.price,
          slug: item.slug,
          type: item.type,
        },
      });
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
        this.data = {
          search: this.search.value['search'],
        };
        this.getData(1, this.count, this.data);
      },
      (err: any | undefined) => {
        this.getData(1, this.count, this.data);
        // console.log(err);
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
      if (res.message == 'empty') {
        for (let item of this.rentalNews) {
          item.wishlist = false;
        }
      } else {
        this.getWishlist();
      }
    });
  }

  pageChanged(event: any) {
    console.log('pageChanged');
  }
}
