import { Component, OnInit } from '@angular/core';
import { RentalNewsService } from '../../../../services/rental-news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogCategoriesService } from '../../../../services/blog-categories.service';
import { AuthService } from '../../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CommentsService } from '../../../../services/comments.service';
import { ToastrService } from 'ngx-toastr';
import { RentalNews } from '../../../../models/rental-news.model';
import { CustomersService } from '../../../../services/customers.service';
import { AdminContactsService } from '../../../../services/customer-contacts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-motel-detail',
  templateUrl: './motel-detail.component.html',
  styleUrls: ['./motel-detail.component.css'],
})
export class MotelDetailComponent implements OnInit {
  linkImg = environment.linkImg;
  id?: any;
  rentalNews: any | undefined;
  rentalNewsDetail?: RentalNews | undefined;
  listImage = [];
  currentUser?: any;
  submitted = false;

  constructor(
    private rentalNewsService: RentalNewsService,
    private route: ActivatedRoute,
    private catBlogs: BlogCategoriesService,
    public auth: AuthService,
    public fb: FormBuilder,
    private commentsService: CommentsService,
    private toastrService: ToastrService,
    private customSer: CustomersService,
    private adminContactsService: AdminContactsService
  ) {}

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
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRentalNews(this.id);
    this.getLatestRentalNews();
  }
  get f() {
    return this.contact.controls;
  }

  getLatestRentalNews(): void {
    this.rentalNewsService.getLatestDetail(3).subscribe(
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
  getRentalNews(id: string): void {
    this.rentalNewsService.get(id).subscribe(
      (data: any | undefined) => {
        this.rentalNewsDetail = data;
        this.listImage = JSON.parse(data.image);
        this.customSer.get(data.customerId).subscribe((res) => {
          this.currentUser = res;
        });
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
      status: '1',
      rental_news_id: JSON.stringify(this.rentalNewsDetail?.id),
      customer_id: localStorage.getItem('currentUser'),
    };
    this.adminContactsService.create(data).subscribe(
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
