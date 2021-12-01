import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogsService } from 'src/app/services/blogs.service';

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
  constructor(
    private blogSer: BlogsService,
    private _route: ActivatedRoute,
    private catSer: BlogCategoriesService
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
            this.count = data['count'];
            this.getBlogByCatId(1, this.count);
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
    this.blogSer.getAll(n, c).subscribe(
      (data: any) => {
        this.blogs_cat = data['rows'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
