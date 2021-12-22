import { Component, Input, OnInit } from '@angular/core';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { Customers } from 'src/app/models/customers.model';
import { AuthService } from 'src/app/services/auth.service';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogsService } from 'src/app/services/blogs.service';
import { CustomersService } from 'src/app/services/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CustomerPremiumServicesService } from '../../../services/customer-premium-services.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  linkImg = environment.linkImg;
  name: string | undefined;
  avatar: string | undefined;
  username: string | undefined;
  cats?: BlogCategories[];
  currentUser?: any;
  id: any;
  customerPremiumServices: any = [];
  limit = 6;
  countNewNotification: any;
  premium: any;
  status = 0;
  manage: any;
  constructor(
    private catBlogs: BlogCategoriesService,
    public auth: AuthService,
    private customSer: CustomersService,
    private _router: Router,
    private blogsService: BlogsService,
    private customerPremiumServicesService: CustomerPremiumServicesService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.manage = '';
    this.id = localStorage.getItem('currentUser');
    if (this.id) {
      this.getById(this.id);
      this.getData();
      this.countNoti();
    }
    this.catBlogs.getAllCat().subscribe((res: any | undefined) => {
      this.cats = res['rows'];
    });
    this.customSer.profileImageUpdate$.subscribe(
      (profileImage) => (this.avatar = profileImage)
    );
    this.customSer.profileUsername$.subscribe(
      (profileUsername) => (this.username = profileUsername)
    );
    this.customSer.notifications$.subscribe(
      (notifications) => (this.countNewNotification = notifications)
    );
    this.customSer.checkPremium$.subscribe(
      (checkPremium) => (this.manage = checkPremium)
    );
  }

  countNoti(): void {
    this.notificationService
      .getByCustomerId(this.id, this.limit, this.status)
      .subscribe((res: any | undefined) => {
        if (res['count'] > this.limit) {
          this.notificationService
            .getByCustomerId(this.id, this.limit, this.status)
            .subscribe((data: any | undefined) => {
              this.countNewNotification = data['count'];
            });
        } else {
          this.countNewNotification = res['count'];
        }
      });
  }

  getData(): void {
    this.customerPremiumServicesService
      .checkPremiumByCustomerId(this.id)
      .subscribe((data: any | undefined) => {
        if (data.count > 0) {
          for (let item of data.rows) {
            if (
              item.PremiumService.type == 2 ||
              item.PremiumService.type == 3
            ) {
              this.manage = 'registered';
            }
          }
        }
      });
  }

  getById(id: string): void {
    this.customSer.get(id).subscribe((res) => {
      if (res.avatar == null) {
        this.avatar = 'https://via.placeholder.com/200x200';
        this.customSer.profileImageUpdate$.next(this.avatar);
      }
      if (res.avatar != null && res.googleId != null) {
        this.avatar = res['avatar'];
        this.customSer.profileImageUpdate$.next(this.avatar);
      }
      if (res.avatar != null && res.googleId == null) {
        this.avatar = this.linkImg + res['avatar'];
        this.customSer.profileImageUpdate$.next(this.avatar);
      }
      this.username = res.username;
      this.currentUser = res;
    });
  }

  redirect(slug: any) {
    this._router
      .navigateByUrl('/danh-muc-bai-viet', { skipLocationChange: true })
      .then(() => {
        this._router.navigate([`/danh-muc-bai-viet/${slug}`]);
      });
  }

  openFilterSearch() {
    let textArea = document.getElementById(
      'filter_search'
    ) as HTMLTextAreaElement;
    textArea.style.display = 'none';
  }
}
