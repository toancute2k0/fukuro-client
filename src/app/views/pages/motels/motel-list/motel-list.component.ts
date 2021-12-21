import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { RentalNews } from '../../../../models/rental-news.model';
import { RentalNewsService } from '../../../../services/rental-news.service';
import { environment } from 'src/environments/environment';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';
import { FormBuilder, Validators } from '@angular/forms';

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
  icon = {
    url: 'assets/img/marker.png',
    scaledSize: new google.maps.Size(40, 40), // scaled size
  };
  markersRepartidores: any = [];

  submitted = false;
  searchKey = '';

  constructor(
    private rentalNewsService: RentalNewsService,
    private bookmarkSer: BookmarksService,
    private fb: FormBuilder,
    public auth: AuthService,
    private customSer: CustomersService
  ) {}

  search = this.fb.group({
    address: ['', Validators.compose([Validators.required])],
  });

  get f() {
    return this.search.controls;
  }

  onSearch(): any {
    this.submitted = true;
    if (this.search.invalid) {
      return false;
    }
    // this._router.navigate(['/thue-nha-dat']);
    console.log(this.search.value);
    this.rentalNewsService.getSearch(this.search.value.address).subscribe(
      (data: any | undefined) => {
        this.count = data;
        console.log(this.count);
      },
      (err) => {
        console.log(err);
      }
    );
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
    const id = localStorage.getItem('currentUser');
    if (id) {
      this.getById(id);
    }
    this.customSer.profileId$.subscribe((profileId) => (this.id = profileId));
    this.rentalNewsService
      .getAll(this.page, this.count, this.orderby)
      .subscribe(
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

  getData(n: any, c: any): void {
    this.rentalNewsService.getAll(n, c, this.orderby).subscribe(
      (data: any | undefined) => {
        this.rentalNews = data['rows'];
        console.log(this.rentalNews);

        this.markersRepartidores = [];
        for (let item of data['rows']) {
          item.image = JSON.parse(item.image);
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
      },
      (err) => {
        console.log(err);
      }
    );
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
        this.getData(1, this.count);
      },
      (err: any | undefined) => {
        console.log(err);
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
}
