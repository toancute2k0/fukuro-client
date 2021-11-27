import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { Blogs } from 'src/app/models/blogs.model';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogsService } from 'src/app/services/blogs.service';
import { AuthService } from 'src/app/services/auth.service';
import { Validators, FormBuilder } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';
import { ToastrService } from 'ngx-toastr';
import { Comments } from 'src/app/models/comments.model';
import { CustomersService } from 'src/app/services/customers.service';
import { Customers } from 'src/app/models/customers.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  cat?: BlogCategories[];
  blogs?: Blogs[];
  blog_details?: Blogs | undefined;
  tag?: any;
  cmt?: any[];
  count?: number;
  userCmt?: Customers | undefined;
  id_blog: any;

  submitted = false;

  constructor(
    private blogSer: BlogsService,
    private route: ActivatedRoute,
    private catBlogs: BlogCategoriesService,
    public auth: AuthService,
    public fb: FormBuilder,
    private commentsService: CommentsService,
    private customerSer: CustomersService,
    private toastrService: ToastrService
  ) {}
  comment = this.fb.group({
    content: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.getById(slug);
    }

    this.getLatest();
    this.catBlogs.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
    });
  }
  get f() {
    return this.comment.controls;
  }
  getLatest(): void {
    this.blogSer.getLatest().subscribe(
      (data: any | undefined) => {
        this.blogs = data['rows'];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getById(slug: string): void {
    this.blogSer.getBySlug(slug).subscribe(
      (data: any | undefined) => {
        this.blog_details = data;
        this.id_blog = data.id;
        this.tag = JSON.parse(data.tag);
        this.getAllCmt(JSON.parse(data.id));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllCmt(id: string): void {
    this.commentsService.getAllByIdBlog(id).subscribe(
      (data: any) => {
        this.cmt = data;
        this.count = data.length;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit(): any {
    this.submitted = true;
    // return validators

    if (this.comment.invalid) {
      return false;
    }
    const data = {
      content: this.comment.value['content'],
      customer_id: localStorage.getItem('currentUser'),
      blog_id: this.blog_details?.id,
    };

    this.commentsService.create(data).subscribe(
      (response: any) => {
        const slug = this.route.snapshot.paramMap.get('slug');
        this.getAllCmt(this.id_blog);
        this.resetForm();
        this.toastrService.success('Bình luận thành công!');
      },
      (error) => {
        this.toastrService.success('Bình luận thất bại!');
      }
    );
  }
  resetForm(): void {
    this.submitted = false;
    this.comment = this.fb.group({
      content: [''],
    });
  }
}
