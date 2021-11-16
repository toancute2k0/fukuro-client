import { Component, Input, OnInit } from '@angular/core';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { Customers } from 'src/app/models/customers.model';
import { AuthService } from 'src/app/services/auth.service';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cat?: BlogCategories[];
  user?: any;
  constructor(private catBlogs: BlogCategoriesService, public auth: AuthService, private customSer: CustomersService) {}

  ngOnInit(): void {
    const id = localStorage.getItem("currentUser");

    if (id) {
      this.getById(id);
    }
    this.catBlogs.getAllCat().subscribe((res) => {
      this.cat = res;
    });
  }

  getById(id: string): void {
    this.customSer.get(id).subscribe((res) => {
      this.user = res;
      console.log(res)
    });
  }
}
