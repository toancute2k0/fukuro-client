import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blogs } from 'src/app/models/blogs.model';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.css'],
})
export class BlogCategoryComponent implements OnInit {
  blogs_cat: any | undefined;
  catId: any;
  constructor(private blogSer: BlogsService, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.catId = params.get('slug');
    });
    this.getByCatBlog(this.catId);
  }

  getByCatBlog(slug: any): void {
    this.blogSer.getByCatId(slug).subscribe(
      (data) => {
        this.blogs_cat = data;
        console.log(this.blogs_cat);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
