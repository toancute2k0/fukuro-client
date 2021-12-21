import { Component, OnInit } from '@angular/core';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionCategoriesService } from 'src/app/services/question-cate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {QuestionService} from 'src/app/services/question.service';
import { AnswersService } from 'src/app/services/answers.service';
import { CustomersService } from 'src/app/services/customers.service';
import { Customers } from 'src/app/models/customers.model';
import {environment} from "../../../../../environments/environment";
@Component({
  selector: 'app-question-by-cat',
  templateUrl: './question-by-cat.component.html',
  styleUrls: ['./question-by-cat.component.css']
})
export class QuestionByCatComponent implements OnInit {
  cp: number = 1;
  avatar?:any;
  name?:any
  cat?: BlogCategories[];
  qtscat?:any;
  submitted = false;
  countquestion:any|undefined;
  countuser?:any;
  count = 6;
  page = 1;
  questionList: any | undefined;
  countanw?:any;
  countcat?:any;
  countanwbyID?:any;
  constructor(
    config: NgbModalConfig, 
    private modalService: NgbModal, 
    private catQuestions: QuestionCategoriesService,
    private route: ActivatedRoute, 
    public fb: FormBuilder,
    private toastrService: ToastrService,
    private questionService: QuestionService,
    private answersService: AnswersService,
    private customerService: CustomersService,
    ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    
  }
  question = this.fb.group({
   
    content: ['', Validators.compose([Validators.required])],
    question_category_id: [
      '',
      Validators.compose([Validators.required]),
    ],
    title: [
      '',
      Validators.compose([Validators.required]),
    ],
    slug: [''],
  });
  open(content:any) {
    this.modalService.open(content);
  }
  ngOnInit(): void {
    const id_cat = this.route.snapshot.paramMap.get('id');
    if(id_cat){
      this.qtscat=id_cat;
      console.log(id_cat)
      this.getAllByIdCat(id_cat);
    }
    this.catQuestions.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
      this.countcat=res['rows'].length;
    });
    this.questionService.getAll(this.page, this.count).subscribe(
      (data: any | undefined) => {
        this.count = data['count'];     
      },
      (err) => {
        console.log(err);
      });
      this.answersService.getAll(this.page, this.countquestion).subscribe(
        (data: any | undefined) => {
          this.countanw = data['count'];
        },
        (err) => {
          console.log(err);
        });
        this.customerService.getAll().subscribe(
          (data: any | undefined) => {
            this.countuser = data['count'];
          },
          (err) => {
            console.log(err);
          });
  }
  get f() {
    return this.question.controls;
  }
  getAllByIdCat(cat_id: any): void {
    this.questionService.getAllByIdCat(cat_id).subscribe(
      (data: any) => {
        this.questionList = data['rows'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // getQuestion(n: any, c: any): void {
  //   this.questionService.getAll(n, c).subscribe(
  //     (data: any) => {
  //       this.questionList = data['rows'];
  //       console.log(this.questionList);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
  click(){
    const id_cat = this.route.snapshot.paramMap.get('id');
    if(id_cat){
      this.getAllByIdCat(id_cat);
      window.location.reload();
    }
  }
  getById(id: string): void {
    this.customerService.get(id).subscribe((res) => {
      this.avatar= environment.linkImg + res['avatar'];
      this.name= res['firstName'] + ' ' + res['lastName'];
    });
  }


}

