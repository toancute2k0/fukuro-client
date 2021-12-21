import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { RentalNewsService } from '../../../../services/rental-news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogCategoriesService } from '../../../../services/blog-categories.service';
import { AuthService } from '../../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentsService } from '../../../../services/comments.service';
import { ToastrService } from 'ngx-toastr';
import { RentalNews } from '../../../../models/rental-news.model';
import { CustomersService } from '../../../../services/customers.service';
import { CustomerContactsService } from '../../../../services/customer-contacts.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-motel-detail',
  templateUrl: './motel-detail.component.html',
  styleUrls: ['./motel-detail.component.css'],
})
export class MotelDetailComponent implements OnInit {
  linkImg = environment.linkImg;
  rentalNews: any | undefined;
  // rentalNewsDetail?: RentalNews | undefined;
  rentalNewsDetail: any = [];
  listImage = [];
  // currentUser: any;
  submitted = false;
  currentUser: any = [];

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  center: any;
  position: any;
  zoom = 17;
  latitude?: number;
  longitude?: number;
  orderby = 'desc';
  limit = 3;
  page = 1;
  avatar: any;
  name: any;
  phone:any;
  icon = {
    url: 'assets/img/marker.png',
    scaledSize: new google.maps.Size(40, 40), // scaled size
  };

  constructor(
    private rentalNewsService: RentalNewsService,
    private route: ActivatedRoute,
    private catBlogs: BlogCategoriesService,
    public auth: AuthService,
    public fb: FormBuilder,
    private commentsService: CommentsService,
    private toastrService: ToastrService,
    private customSer: CustomersService,
    private customerContactsService: CustomerContactsService,
    private _router: Router,
    private httpClient: HttpClient
  ) {}

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  data: any;
  contact = this.fb.group({
    firstName: ['', Validators.compose([Validators.required])],
    lastName: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9 ]{10}'),
      ]),
    ],
    message: ['', Validators.compose([Validators.required])],
  });

  ngOnInit(): void {
    this.data = '';
    this.currentUser = [];
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.getRentalNews(slug);
    }
    this.getLatestRentalNews();
  }
  get f() {
    return this.contact.controls;
  }
  redirect(slug: any) {
    this.getRentalNews(slug);
    this._router.navigate([`/thue-nha-dat/${slug}`]);
  }

  getLatestRentalNews(): void {
    this.rentalNewsService.getAll(this.page, this.limit, this.orderby, this.data).subscribe(
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
  getRentalNews(slug: string): void {
    this.rentalNewsService.getBySlug(slug).subscribe(
      (data: any | undefined) => {
        this.rentalNewsDetail = data;
        this.contact.patchValue({message: 'Tôi quan tâm tới '+ this.rentalNewsDetail.name +'. Làm ơn liên lạc lại với tôi, cảm ơn!'});
        this.latitude = parseFloat(data.lat);
        this.longitude = parseFloat(data.lng);
        this.center = { lat: this.latitude, lng: this.longitude };
        this.position = this.center;
        this.listImage = JSON.parse(data.image);
        if(this.rentalNewsDetail.Customer.avatar == null){
          this.avatar = 'https://via.placeholder.com/200x200';
        }
        if(this.rentalNewsDetail.Customer.avatar != null && this.rentalNewsDetail.Customer.googleId != null){
          this.avatar = data.data.avatar;
        }
        if(this.rentalNewsDetail.Customer.avatar != null && this.rentalNewsDetail.Customer.googleId == null){
          this.avatar = this.linkImg + data.data.avatar;
        }
        if(this.rentalNewsDetail.Customer.firstName != null && this.rentalNewsDetail.Customer.lastName != null){
          this.name = this.rentalNewsDetail.Customer.firstName + ' ' + this.rentalNewsDetail.Customer.lastName;
        }
        if(this.rentalNewsDetail.Customer.firstName != null && this.rentalNewsDetail.Customer.lastName != null){
          this.name = this.rentalNewsDetail.Customer.firstName + ' ' + this.rentalNewsDetail.Customer.lastName;
        }
        if(this.rentalNewsDetail.Customer.firstName == null && this.rentalNewsDetail.Customer.lastName == null){
          this.name = this.rentalNewsDetail.Customer.username;
        }
        if(this.rentalNewsDetail.Customer.phone != null){
          this.phone = this.rentalNewsDetail.Customer.phone;
        }else{
          this.phone = '';
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit(): any {
    this.submitted = true;
    if (this.contact.invalid) {
      return false;
    }
    const data = {
      first_name: this.contact.value['firstName'],
      last_name: this.contact.value['lastName'],
      email: this.contact.value['email'],
      phone: this.contact.value['phone'],
      subject: this.contact.value['subject'],
      message: this.contact.value['message'],
      status: 0,
      rental_news_id: JSON.stringify(this.rentalNewsDetail?.id),
      customer_id: this.rentalNewsDetail.Customer.id,
      detail_url: '/my-account/customer-contacts/detail/'
    };
    this.customerContactsService.create(data).subscribe(
      (res) => {
        this.resetForm();
        this.toastrService.success('Gửi liên hệ thành công!');
      },
      (error) => {
        this.toastrService.success('Gửi liên hệ thất bại!');
      }
    );
  }

  resetForm(): void {
    this.submitted = false;
    this.contact = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      status: '1',
    });
  }
}
