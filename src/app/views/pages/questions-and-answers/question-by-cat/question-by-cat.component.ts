import { Component, OnInit } from '@angular/core';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionCategoriesService } from 'src/app/services/question-cate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from 'src/app/services/question.service';
import { AnswersService } from 'src/app/services/answers.service';
import { CustomersService } from 'src/app/services/customers.service';
import { Customers } from 'src/app/models/customers.model';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-question-by-cat',
  templateUrl: './question-by-cat.component.html',
  styleUrls: ['./question-by-cat.component.css'],
})
export class QuestionByCatComponent implements OnInit {
  cp: number = 1;
  avatar?: any;
  name?: any;
  cat?: BlogCategories[];
  qtscat?: any;
  submitted = false;
  countquestion: any | undefined;
  countuser?: any;
  count = 6;
  page = 1;
  questionList: any | undefined;
  countanw?: any;
  countcat?: any;
  countanwbyID?: any;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private catQuestions: QuestionCategoriesService,
    private route: ActivatedRoute,
    private _router: Router,
    public fb: FormBuilder,
    private toastrService: ToastrService,
    private questionService: QuestionService,
    private answersService: AnswersService,
    private customerService: CustomersService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
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
  ngOnInit(): void {
    const id_cat = this.route.snapshot.paramMap.get('id');
    if (id_cat) {
      this.qtscat = id_cat;
      // console.log(id_cat)
      this.getAllByIdCat(id_cat);
    }
    this.catQuestions.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
      this.countcat = res['rows'].length;
    });
    this.questionService.getAll(this.page, this.count).subscribe(
      (data: any | undefined) => {
        this.count = data['count'];
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
  getAllByIdCat(cat_id: any): void {
    this.questionService.getAllByIdCat(cat_id).subscribe(
      (data: any) => {
        this.questionList = data['rows'];
        // console.log(this.questionList);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  redirect(id: any) {
    this._router.navigate([`hoi-dap/cau-hoi-theo-chuyen-muc/${id}`]);
    this.catQuestions.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
    });
    this.getAllByIdCat(id);
    this.qtscat = id;
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
    // ?????i k?? t??? c?? d???u th??nh kh??ng d???u
    text = text.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'a');
    text = text.replace(/??|??|???|???|???|??|???|???|???|???|???/gi, 'e');
    text = text.replace(/i|??|??|???|??|???/gi, 'i');
    text = text.replace(/??|??|???|??|???|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'o');
    text = text.replace(/??|??|???|??|???|??|???|???|???|???|???/gi, 'u');
    text = text.replace(/??|???|???|???|???/gi, 'y');
    text = text.replace(/??/gi, 'd');
    // X??a c??c k?? t??? ?????t bi???t
    text = text.replace(
      /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
      ''
    );
    // ?????i kho???ng tr???ng th??nh k?? t??? g???ch ngang
    text = text.replace(/ /gi, '-');
    // ?????i nhi???u k?? t??? g???ch ngang li??n ti???p th??nh 1 k?? t??? g???ch ngang
    // Ph??ng tr?????ng h???p ng?????i nh???p v??o qu?? nhi???u k?? t??? tr???ng
    text = text.replace(/\-\-\-\-\-/gi, '-');
    text = text.replace(/\-\-\-\-/gi, '-');
    text = text.replace(/\-\-\-/gi, '-');
    text = text.replace(/\-\-/gi, '-');
    // X??a c??c k?? t??? g???ch ngang ??? ?????u v?? cu???i
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
        this.toastrService.success('????ng c??u h???i th??nh c??ng!');
        this.modalService.dismissAll();
        const id_cat = this.route.snapshot.paramMap.get('id');
        if (id_cat) {
          this.qtscat = id_cat;
          this.getAllByIdCat(id_cat);
        }
      },
      (error) => {
        this.toastrService.success('????ng c??u h???i th???t b???i!');
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
