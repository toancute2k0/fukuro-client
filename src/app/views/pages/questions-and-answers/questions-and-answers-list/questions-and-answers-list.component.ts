import { Component, OnInit } from '@angular/core';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionCategoriesService } from 'src/app/services/question-cate.service';
import { QuestionCategories } from 'src/app/models/question-cat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/question.service';
import { AnswersService } from 'src/app/services/answers.service';
import { CustomersService } from 'src/app/services/customers.service';
import { Customers } from 'src/app/models/customers.model';
import { environment } from '../../../../../environments/environment';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-questions-and-answers-list',
  templateUrl: './questions-and-answers-list.component.html',
  styleUrls: ['./questions-and-answers-list.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class QuestionsAndAnswersListComponent implements OnInit {
  cp: number = 1;
  avatar?: any;
  name?: any;
  cat?: QuestionCategories[];
  submitted = false;
  countquestion: any | undefined;
  countuser?: any;
  count = 6;
  page = 1;
  questionList: any | undefined;
  countanw?: any;
  countanwbyID?: any;
  countcat?: any;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private catQuestions: QuestionCategoriesService,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private toastrService: ToastrService,
    private questionService: QuestionService,
    private answersService: AnswersService,
    private titleService: Title,
    private customerService: CustomersService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    this.titleService.setTitle('Hỏi đáp');
  }
  question = this.fb.group({
    content: ['', Validators.compose([Validators.required])],
    question_category_id: ['', Validators.compose([Validators.required])],
    title: ['', Validators.compose([Validators.required])],
    slug: [''],
  });
  open(content: any) {
    this.modalService.open(content);
  }
  close(content: any) {
    this.modalService.dismissAll(content);
  }
  ngOnInit(): void {
    this.catQuestions.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
      this.countcat = res['rows'].length;
    });
    this.questionService.getAll(this.page, this.count).subscribe(
      (data: any | undefined) => {
        this.count = data['count'];
        this.getQuestion(1, this.count);
      },
      (err) => {
        console.log(err);
      }
    );
    this.answersService.getAll(this.page, this.countquestion).subscribe(
      (data: any | undefined) => {
        this.countanw = data['count'];
      },
      (err) => {
        console.log(err);
      }
    );
    this.customerService.getAll().subscribe(
      (data: any | undefined) => {
        this.countuser = data['count'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  get f() {
    return this.question.controls;
  }
  getAllByIdQuestions(id: any): void {
    this.answersService.getAllByIdQuestions(id).subscribe(
      (data: any) => {
        this.countanwbyID = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getQuestion(n: any, c: any): void {
    this.questionService.getAll(n, c).subscribe(
      (data: any) => {
        this.questionList = data['rows'];
        // console.log(this.questionList);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getById(id: string): void {
    this.customerService.get(id).subscribe((res) => {
      this.avatar = environment.linkImg + res['avatar'];
      this.name = res['firstName'] + ' ' + res['lastName'];
    });
  }
  // Create slug
  modelChangeFn(e: string) {
    const text = this.transform(e);
    this.question.patchValue({ slug: text });
  }

  // Handle slug
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
    if (this.question.invalid) {
      return false;
    }
    const data = {
      content: this.question.value['content'],
      question_category_id: this.question.value['question_category_id'],
      title: this.question.value['title'],
      customer_id: localStorage.getItem('currentUser'),
      slug: this.question.value['slug'],
      detail_url: '/hoi-dap/chi-tiet/',
    };

    this.questionService.create(data).subscribe(
      (response: any) => {
        this.resetForm();
        this.toastrService.success('Đăng câu hỏi thành công!');
        this.getQuestion(1, this.count);
        this.modalService.dismissAll();
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
      slug: [''],
    });
  }
}
