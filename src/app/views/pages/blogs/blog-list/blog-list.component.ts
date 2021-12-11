import { Component, OnInit } from '@angular/core';
import { Blogs } from 'src/app/models/blogs.model';
import { BlogsService } from 'src/app/services/blogs.service';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  cp: number = 1;
  page = 1;
  count = 6;
  blogs: any | undefined;
  constructor(private blogSer: BlogsService) {}
  ngOnInit(): void {
    this.blogSer.getAll(this.page, this.count).subscribe(
      (data: any | undefined) => {
        this.count = data['count'];
        this.getBlogs(1, this.count);
      },
      (err) => {
        console.log(err);
      });
  }

  getBlogs(n: any, c: any): void {
    this.blogSer.getAll(n, c).subscribe(
      (data: any) => {
        for (var i = 0; i < data['rows'].length; i++) {
          data['rows'][i].thumbnail = environment.linkImg+data['rows'][i].thumbnail;
        }
        this.blogs = data['rows'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
