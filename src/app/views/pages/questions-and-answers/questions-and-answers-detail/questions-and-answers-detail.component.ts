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
  cp: number = 1;
  anw?: any;
  anwID?: any;
  countanw?: any;
  countcat?: any;
  page = 1;
  countquestion: any | undefined;
  countanwbyID?: any;
  countuser?: any;
  cat?: BlogCategories[];
  submitted = false;
  avatar: string | undefined;
  username: string | undefined;
  name: string | undefined;
  nameRep: string | undefined;
  avatarRep: string | undefined;
  questions_details: any;
  buttonlike?: any;
  like = [];
  id_customer?: any;
  public isCollapsed: any;
  public isCollapsed2: any;
  constructor(
    private toastrService: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private catQuestions: QuestionCategoriesService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    public ngbCollapse: NgbCollapse,
    public fb: FormBuilder,
    private customSer: CustomersService,
    private answersService: AnswersService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  answers = this.fb.group({
    content: ['', Validators.compose([Validators.required])],
    question_id: [''],
    status: [1],
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
    const id = localStorage.getItem('currentUser');
    if (id) {
      this.getById(id);
      this.id_customer = id;
      console.log('id_customer' + this.id_customer);
    }
    const id_qts = this.route.snapshot.paramMap.get('id');
    if (id_qts) {
      this.getQtsByID(id_qts);
    }
    (err: any) => {
      console.log(err);
    };
    this.questionService.getAll(this.page, this.countquestion).subscribe(
      (data: any | undefined) => {
        this.countquestion = data['count'];
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
    this.customSer.getAll().subscribe(
      (data: any | undefined) => {
        this.countuser = data['count'];
      },
      (err) => {
        console.log(err);
      }
    );
    this.isCollapsed = true;
    this.isCollapsed2 = true;
    this.catQuestions.getAllCat().subscribe((res: any | undefined) => {
    this.cat = res['rows'];
    this.countcat = res['rows'].length;
    });
  }
  likeButtonclick(id: any) {
    const id_qts = this.route.snapshot.paramMap.get('id');
    if (id_qts) {
      this.getQtsByID(id_qts);
    }
    const data = {
      customer_id: localStorage.getItem('currentUser'),
    };
    this.answersService.updatelike(id, data).subscribe(
      (data: any) => {
        for (let item of this.anw) {
          if (item.id == id) {
            // console.log('id: '+ data);
            item.count_like = data.count_like;
          }
        }
      },
      (err) => {
        this.toastrService.error(err.error.message);
      }
    );
  }
  disklikeButtonclick(id: any) {
    const id_qts = this.route.snapshot.paramMap.get('id');
    if (id_qts) {
      this.getQtsByID(id_qts);
    }
    const data = {
      customer_id: localStorage.getItem('currentUser'),
    };
    this.answersService.updatedisklike(id, data).subscribe(
      (data: any) => {
        for (let item of this.anw) {
          if (item.id == id) {
            item.count_dislike = data.count_dislike;
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getById(id: string): void {
    this.customSer.get(id).subscribe((res) => {
      this.avatar = environment.linkImg + res['avatar'];
      this.name = res['firstName'] + ' ' + res['lastName'];
    });
  }
  getAllByIdQuestions(id: any): void {
    this.answersService.getAllByIdQuestions(id).subscribe(
      (data: any) => {
        this.anw = data['rows'];
        this.countanwbyID = data['count'];
        // console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getQtsByID(id_qts: string): void {
    this.questionService.getQtsByID(id_qts).subscribe(
      (data: any | undefined) => {
        this.questions_details = data;
        this.anwID = [data.id];
        this.getAllByIdQuestions(this.anwID);
        this.answers = this.fb.group({
          question_id: [data.id],
          content: [''],
          customer_id: [data.customer_id],
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
    if (this.answers.invalid) {
      return false;
    }
    const data = {
      content: this.answers.value['content'],
      customer_id: localStorage.getItem('currentUser'),
      question_id: this.answers.value['question_id'],
      status: this.answers.value['status'],
      detail_url: '/hoi-dap/chi-tiet/',
    };
    this.answersService.create(data).subscribe(
      (response: any) => {
        this.resetForm();
        this.toastrService.success('????ng c??u tr??? l???i th??nh c??ng!');
        const id_qts = this.route.snapshot.paramMap.get('id');
        if (id_qts) {
          this.getQtsByID(id_qts);
        }
        this.modalService.dismissAll();
        this.questionService.getAll(this.page, this.countquestion).subscribe(
          (data: any | undefined) => {
            this.countquestion = data['count'];
            console.log(  this.countquestion);
          },
          (err) => {
            console.log(err);
          }
        );
        
      },
      (error) => {
        this.toastrService.success('????ng c??u tr??? l???i th???t b???i!');
      }
    );
  }
  resetForm(): void {
    this.submitted = false;
    this.answers = this.fb.group({
      content: [''],
    });
  }
}
