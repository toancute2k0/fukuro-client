import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { Blogs } from 'src/app/models/blogs.model';
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
  blogs_cat?: Blogs[];
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
    // this.getByCatBlog(this.cat);
  }

  // getByCatBlog(id: number): void {
  //   this.blogSer.getByCatId(id).subscribe(
  //     (data: any | undefined) => {
  //       this.blogs_cat = data['rows'];
  //       console.log(this.blogs_cat);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  getBlogBySlug(slug: string): void {
    this.catSer.getSlug(slug).subscribe(
      (data: any) => {
        this.cat = data.id;
        console.log(this.cat);
        this.blogSer.getByCatId(this.cat).subscribe(
          (data: any | undefined) => {
            this.blogs_cat = data['rows'];
            console.log(this.blogs_cat);
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
}
