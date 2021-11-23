import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { Blogs } from 'src/app/models/blogs.model';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogsService } from 'src/app/services/blogs.service';
import { AuthService } from 'src/app/services/auth.service';
import {Validators, FormBuilder} from "@angular/forms";
import { CommentsService } from 'src/app/services/comments.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  id?: any;
  cat?: BlogCategories[];
  blogs?: Blogs[];
  blog_details?: Blogs | undefined;
  newArray = [];
  tag?: any;

  submitted = false;

  constructor(
    private blogSer: BlogsService,
    private route: ActivatedRoute,
    private catBlogs: BlogCategoriesService,
    public auth: AuthService,
    public fb: FormBuilder,
    private commentsService: CommentsService,
    private toastrService: ToastrService
  ) {}
  comment = this.fb.group({
    content: ['', Validators.compose([Validators.required, Validators.minLength(6)]),],
    status: ['1'],
    customerId: [],
    blogId: [this.id],
  });
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const currentUser = localStorage.getItem('currentUser');
    if(currentUser){
      this.comment.patchValue({customerId: currentUser});
    }
    if (this.id) {
      this.comment.patchValue({blogId: this.id});
      this.getById(this.id);
    }
    this.getBlogs();
    this.catBlogs.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
    });
  }
  get f() {
    return this.comment.controls;
  }
  getBlogs(): void {
    this.blogSer.getLatest().subscribe(
      (data: any | undefined) => {
        this.blogs = data['rows'];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getById(id: string): void {
    this.blogSer.get(id).subscribe(
      (data: any | undefined) => {
        this.blog_details = data;
        this.tag = JSON.parse(data.tag);
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
      status: this.comment.value['status'],
      customer_id: this.comment.value['customerId'],
      blog_id: this.comment.value['blogId'],
    }
    this.commentsService.create(data)
      .subscribe(
        response => {
          this.resetForm();
          this.toastrService.success('Bình luận thành công!');
        },
        error => {
          this.toastrService.success('Bình luận thất bại!');
        });
  }
  resetForm(): void {
    this.submitted = false;
    this.comment = this.fb.group(
      {
        content: ['']});
  }
}
