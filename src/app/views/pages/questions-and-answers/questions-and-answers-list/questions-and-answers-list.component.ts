import { Component, OnInit } from '@angular/core';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogCategoriesService } from 'src/app/services/blog-categories.service';
import { BlogsService } from 'src/app/services/blogs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {QuestionService} from 'src/app/services/question.service'
@Component({
  selector: 'app-questions-and-answers-list',
  templateUrl: './questions-and-answers-list.component.html',
  styleUrls: ['./questions-and-answers-list.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class QuestionsAndAnswersListComponent implements OnInit {
  cat?: BlogCategories[];
  submitted = false;
  constructor(
    config: NgbModalConfig, 
    private modalService: NgbModal, 
    private catBlogs: BlogCategoriesService,
    private route: ActivatedRoute, 
    public fb: FormBuilder,
    private toastrService: ToastrService,
    private questionService: QuestionService,
    ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    
  }
  question = this.fb.group({
    content: [
      '',
      Validators.compose([Validators.required]),
    ],
    question_category_id: [
      '',
      Validators.compose([Validators.required]),
    ],
    title: [
      '',
      Validators.compose([Validators.required]),
    ],
  });
  open(content:any) {
    this.modalService.open(content);
  }
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.catBlogs.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
    });
  }
  get f() {
    return this.question.controls;
  }
  onSubmit(): any {
    this.submitted = true;
    
    console.log(this.question)
    if (this.question.invalid) {
      return false;
    }
    const data = {
      content: this.question.value['content'],
      question_category_id: this.question.value['question_category_id'],
      title:this.question.value['title'],
      customer_id: localStorage.getItem('currentUser'),
      slug:'hoi-dap',
    };
    console.log(data);
    this.questionService.create(data).subscribe(
      (response: any) => {
        this.resetForm();
        this.toastrService.success('Đăng câu hỏi thành công!');
      },
      (error) => {
        this.toastrService.success('Đăng câu hỏi thất bại!');
      }
    );
  }
  resetForm(): void {
    this.submitted = false;
    this.question = this.fb.group({
      content: [''],
      question_category_id: [''],
      title: [''],
    });
  }

}
