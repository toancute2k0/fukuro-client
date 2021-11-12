import { Component, OnInit } from '@angular/core';
import { Blogs } from 'src/app/models/blogs.model';
import { BlogsService } from 'src/app/services/blogs.service';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  blogs?: Blogs[];
  cat?: BlogCategories[];
  constructor(
    private blogSer: BlogsService,
    private catBlogs: BlogCategoriesService
  ) {}
  ngOnInit(): void {
    this.getBlogs();
    this.catBlogs.getAllCat().subscribe((res) => {
      this.cat = res;
    });
  }

  getBlogs(): void {
    this.blogSer.getAll().subscribe(
      (data) => {
        this.blogs = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
