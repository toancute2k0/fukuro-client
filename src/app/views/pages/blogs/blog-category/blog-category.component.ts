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
      this.catId = params.get('id');
    });
    this.getByCatBlog(this.catId);
  }

  getByCatBlog(catId: any): void {
    this.blogSer.getByCatId(catId).subscribe(
      (data: any | undefined) => {
        this.blogs_cat = data['rows'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
