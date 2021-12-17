import { Component, OnInit } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  NgbCollapse,
} from '@ng-bootstrap/ng-bootstrap';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionCategoriesService } from 'src/app/services/question-cate.service';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/question.model';
import { Validators, FormBuilder } from '@angular/forms';
import { CustomersService } from 'src/app/services/customers.service';
import { Customers } from 'src/app/models/customers.model';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AnswersService } from 'src/app/services/answers.service';
@Component({
  selector: 'app-questions-and-answers-detail',
  templateUrl: './questions-and-answers-detail.component.html',
  styleUrls: ['./questions-and-answers-detail.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbCollapse],
})
export class QuestionsAndAnswersDetailComponent implements OnInit {
  anw?:any;
  count?:any;
  cat?: BlogCategories[];
  submitted = false;
  avatar: string | undefined;
  username: string | undefined;
  name: string | undefined;
  nameRep: string | undefined;
  avatarRep: string | undefined;
  questions_details: any;
  public isCollapsed: any;
  public isCollapsed2: any;
  constructor(
    private toastrService: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private catQuestions: QuestionCategoriesService,
    private QuestionService: QuestionService,
    private route: ActivatedRoute,
    public ngbCollapse: NgbCollapse,
    public fb: FormBuilder,
    private customSer: CustomersService,
    private AnswersService:AnswersService,
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  answers = this.fb.group({
    content: ['', Validators.compose([Validators.required])],
    question_id:[''],
    status:[1]
  });
  get f() {
    return this.answers.controls;
  }
  //summernote editer
  config = {
    placeholder: '',
    tabsize: 2,
    height: 120,
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
    ],
    fontNames: [
      'Helvetica',
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Roboto',
      'Times',
    ],
  };

  open(content: any) {
    this.modalService.open(content);
  }
  ngOnInit(): void {
    const questionId= this.route.snapshot.paramMap.get('id');
    if (questionId) {
      console.log(questionId);
      this.getAllByIdQuestions(questionId);
    }(err:any) => {
      console.log(err);
    } 
    const id = localStorage.getItem('currentUser');
    if (id) {
      this.getById(id);
    }
    const Repid = '1';
    if (Repid) {
      this.getUserAwnById(Repid);
    }
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.getBySlug(slug);
    }
      (err:any) => {
        console.log(err);
      } 
    this.isCollapsed = true;
    this.isCollapsed2 = true;
    this.catQuestions.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
    });
  
  }
  getById(id: string): void {
    this.customSer.get(id).subscribe((res) => {
      this.avatar= environment.linkImg + res['avatar'];
      this.name= res['firstName'] + ' ' + res['lastName'];
    });
  }
  getUserAwnById(id: string): void {
    this.customSer.get(id).subscribe((res) => {
      this.avatarRep= environment.linkImg + res['avatar'];
      this.nameRep= res['firstName'] + ' ' + res['lastName'];
    });
  }
  getAllByIdQuestions(id: any): void {
    this.AnswersService.getAllByIdQuestions(id).subscribe(
      (data: any) => {
        this.anw = data;
        this.count = data.length;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getBySlug(slug: string): void {
    this.QuestionService.getBySlug(slug).subscribe(
      (data: any | undefined) => {
        this.questions_details = data;
        this.answers = this.fb.group({
          question_id: [this.questions_details.id, Validators.compose([Validators.required]),],
          content: [''],
          customer_id:[this.questions_details.customer_id, Validators.compose([Validators.required]),]
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  transform(value: string) {
    let text = value.toLowerCase();
    // --------------------------
    // Đổi ký tự có dấu thành không dấu
    text = text.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    text = text.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    text = text.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    text = text.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    text = text.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    text = text.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    text = text.replace(/đ/gi, 'd');
    // Xóa các ký tự đặt biệt
    text = text.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      ''
    );
    // Đổi khoảng trắng thành ký tự gạch ngang
    text = text.replace(/ /gi, '-');
    // Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    // Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    text = text.replace(/\-\-\-\-\-/gi, '-');
    text = text.replace(/\-\-\-\-/gi, '-');
    text = text.replace(/\-\-\-/gi, '-');
    text = text.replace(/\-\-/gi, '-');
    // Xóa các ký tự gạch ngang ở đầu và cuối
    text = '@' + text + '@';
    text = text.replace(/\@\-|\-\@|\@/gi, '');

    return text;
  }
  onSubmit(): any {
    this.submitted = true;
    console.log(this.answers.value)
    if (this.answers.invalid) {
      return false;
    }
    const data = {
      content: this.answers.value['content'],
      customer_id:localStorage.getItem('currentUser'),
      question_id:this.answers.value['question_id'],
      status:this.answers.value['status'],
    };
    console.log(data);
    this.AnswersService.create(data).subscribe(
      (response: any) => {
        this.resetForm();
        this.toastrService.success('Đăng câu trả lời thành công!');
      },
      (error) => {
        this.toastrService.success('Đăng câu trả lời thất bại!');
      }   
    );
  }
  resetForm(): void {
    this.submitted = false;
    this.answers= this.fb.group({
      content:['']
    })
  }
}
