import { Component, OnInit } from '@angular/core';
import { Blogs } from 'src/app/models/blogs.model';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  blogs?: Blogs[];
  constructor(private blogSer: BlogsService) {}
  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogSer.getAllLatest('6').subscribe(
      (data: any) => {
        this.blogs = data['rows'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
