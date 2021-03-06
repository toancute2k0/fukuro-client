import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogsService } from 'src/app/services/blogs.service';
import { RouterModule, Router } from '@angular/router';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.css'],
})
export class BlogCategoryComponent implements OnInit {
  cat?: any;
  catSlug: any;
  blogs_cat: any | undefined;
  page = 1;
  count = 6;
  cp = 1;
  flag = false;
  orderby = 'desc';
  constructor(
    private blogSer: BlogsService,
    private _route: ActivatedRoute,
    private catSer: BlogCategoriesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.catSlug = params.get('slug');
    });
    this.getBlogBySlug(this.catSlug);
  }
  getBlogBySlug(slug: string): void {
    this.catSer.getSlug(slug).subscribe(
      (data: any) => {
        this.cat = data.id;
        this.blogSer.getByCatId(this.cat, this.page, this.count).subscribe(
          (data: any | undefined) => {
            for (let item of data['rows']) {
              item.thumbnail = environment.linkImg+item.thumbnail;
            }
            if(data['count'] > this.count){
              this.getBlogByCatId(this.cat, data['count']);
            }else{
              this.blogs_cat = data['rows'];
            }
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getBlogByCatId(n: any, c: any): void {
    this.blogSer.getByCatId(n, this.page, c).subscribe(
      (data: any) => {
        this.blogs_cat = data['rows'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
