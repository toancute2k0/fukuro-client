import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { RentalNews } from '../../../../models/rental-news.model';
import { RentalNewsService } from '../../../../services/rental-news.service';
import { environment } from 'src/environments/environment';
import { BookmarksService } from 'src/app/services/bookmarks.service';
import { AuthService } from 'src/app/services/auth.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-motel-list',
  templateUrl: './motel-list.component.html',
  styleUrls: ['./motel-list.component.css'],
})
export class MotelListComponent implements OnInit {
  linkImg = environment.linkImg;
  page = 1;
  count = 6;
  rentalNews: any | undefined;
  id: any;
  wishlist = [];
  public isMobile = false;

  cp: number = 1;

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  center: any;
  position: any;
  zoom = 13;
  latitude?: number;
  longitude?: number;
  icon = {
    url: 'assets/img/marker.png',
    scaledSize: new google.maps.Size(40, 40), // scaled size
  };
  markersRepartidores: any = [];

  constructor(
    private rentalNewsService: RentalNewsService,
    private bookmarkSer: BookmarksService,
    public auth: AuthService,
    private customSer: CustomersService
  ) {}

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  ngOnInit(): void {
    const id = localStorage.getItem('currentUser');
    if (id) {
      this.getById(id);
    }
    this.customSer.profileId$.subscribe((profileId) => (this.id = profileId));
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
        this.markersRepartidores = [];
        for (var i = 0; i < data['rows'].length; i++) {
          this.latitude = parseFloat(data['rows'][i].lat);
          this.longitude = parseFloat(data['rows'][i].lng);
          this.center = { lat: 10.0268531, lng: 105.7573112 };
          this.markersRepartidores.push({
            position: {
              lat: this.latitude,
              lng: this.longitude,
            },
            title: {
              address: data['rows'][i].address,
              name: data['rows'][i].name,
            },
          });
          // console.log(this.markersRepartidores);

          data['rows'][i].image = JSON.parse(data['rows'][i].image);
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
