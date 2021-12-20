import { Component, Input, OnInit } from '@angular/core';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { Customers } from 'src/app/models/customers.model';
import { AuthService } from 'src/app/services/auth.service';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogsService } from 'src/app/services/blogs.service';
import { CustomersService } from 'src/app/services/customers.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

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
  constructor(
    private catBlogs: BlogCategoriesService,
    public auth: AuthService,
    private customSer: CustomersService,
    private _router: Router,
    private blogsService: BlogsService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('currentUser');

    if (id) {
      this.getById(id);
    }
    this.catBlogs.getAllCat().subscribe((res: any | undefined) => {
      this.cats = res['rows'];
    });
    this.customSer.profileImageUpdate$.subscribe(
      (profileImage) => (this.avatar = profileImage)
    );
    this.customSer.profileName$.subscribe(
      (profileName) => (this.name = profileName)
    );
    this.customSer.profileUsername$.subscribe(
      (profileUsername) => (this.username = profileUsername)
    );
  }

  getById(id: string): void {
    this.customSer.get(id).subscribe((res) => {
      if(res.googleId != null){
        this.avatar = res['avatar'];
      }else{
        this.avatar = this.linkImg + res['avatar'];
      }
      this.name = res['firstName'] + ' ' + res['lastName'];
      this.username = res['username'];
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
