import { query } from '@angular/animations';
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
  currentBlogs: Blogs = {
    name: '',
    slug: '',
    image: '',
    summary: '',
    description: '',
    category_id: '',
    created_at: '',
  };

  cat?: BlogCategories[];
  blogs?: Blogs[];

  constructor(
    private blogSer: BlogsService,
    private route: ActivatedRoute,
    private catBlogs: BlogCategoriesService
  ) {}
  ngOnInit(): void {
    // this.route.paramMap.subscribe((query) => {
    //   let id = query.get('id');
    //   this.blogSer.get(id).subscribe((res) => {
    //     this.currentBlogs = res;
    //     console.log(this.currentBlogs.image);
    //   });
    // });
    this.getBlogs();
    this.catBlogs.getAllCat().subscribe((res) => {
      this.cat = res;
    });
    this.getById(this.route.snapshot.params.id);
    console.log(this.route.snapshot.params.id);
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

  getById(id: string): void {
    this.blogSer.get(id).subscribe(
      (data) => {
        this.currentBlogs = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
