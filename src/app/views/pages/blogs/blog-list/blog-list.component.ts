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
  orderby = 'desc';
  limit = 6;
  constructor(private blogSer: BlogsService) {}
  ngOnInit(): void {
    this.blogSer.getAll(this.page, this.limit, this.orderby).subscribe(
      (data: any | undefined) => {
        if(data['count'] > this.limit){
          this.getBlogs(1, data['count']);
        }else{
          this.blogs = data['rows'];
        }
        this.limit = data['count'];

      },
      (err) => {
        console.log(err);
      });
  }

  getBlogs(n: any, c: any): void {
    this.blogSer.getAll(n, c, this.orderby).subscribe(
      (data: any) => {
          for (let item of data['rows']) {
              item.thumbnail = environment.linkImg+item.thumbnail;
          }
        this.blogs = data['rows'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
