import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { Blogs } from 'src/app/models/blogs.model';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  cat?: BlogCategories[];
  blogs?: Blogs[];
  blog_details?: Blogs | undefined;
  newArray = [];

  constructor(
    private blogSer: BlogsService,
    private route: ActivatedRoute,
    private catBlogs: BlogCategoriesService
  ) {}
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.getById(slug);
    }
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

  getById(slug: string): void {
    this.blogSer.getById(slug).subscribe({
      next: (data) => ((this.blog_details = data), console.log(data?.slug)),
    });
  }
}
