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
  cp: number=1;
  anw?:any;
  anwID?:any;
  countanw?:any;
  page=1;
  countquestion:any|undefined;
  countanwbyID?:any;
  countuser?:any;
  cat?: BlogCategories[];
  submitted = false;
  avatar: string | undefined;
  username: string | undefined;
  name: string | undefined;
  nameRep: string | undefined;
  avatarRep: string | undefined;
  questions_details: any;
  buttonlike?:any;
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
    private answersService:AnswersService,
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  answers = this.fb.group({
    content: ['', Validators.compose([Validators.required])],
    question_id:[''],
    status:[1],
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
    }
    const id_qts = this.route.snapshot.paramMap.get('id');
    if (id_qts) {
      this.getQtsByID(id_qts);
      // this.getAllByIdQuestions(id_qts)
    }
      (err:any) => {
        console.log(err);
      } 
      this.questionService.getAll(this.page, this.countquestion).subscribe(
        (data: any | undefined) => {
          this.countquestion = data['count'];
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
          this.customSer.getAll().subscribe(
            (data: any | undefined) => {
              this.countuser = data['count'];
            },
            (err) => {
              console.log(err);
            });
    this.isCollapsed = true;
    this.isCollapsed2 = true;
    this.catQuestions.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
    });
  
  }
  likeButtonclick(id:any){
    console.log('id: '+id);
    const data={
      customer_id:localStorage.getItem('currentUser')
      
    }
    this.answersService.updatelike(id, data).subscribe(
      (data: any) => {
        for (let item of this.anw) {
          if(item.id == id){
          item.count_like=data.count_like;
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  disklikeButtonclick(id:any){
    const data={
      customer_id:localStorage.getItem('currentUser')
    }

    this.answersService.updatedisklike(id, data).subscribe(
      (data: any) => {
        for (let item of this.anw) {
          if(item.id == id){
             item.count_dislike=data.count_dislike;
          }
          if(data.customer_id==item.id){
           this.buttonlike=true;
           console.log(this.buttonlike)
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
      this.avatar= environment.linkImg + res['avatar'];
      this.name= res['firstName'] + ' ' + res['lastName'];
    });
  }
  getAllByIdQuestions(id: any): void {
    this.answersService.getAllByIdQuestions(id).subscribe(
      (data: any) => {
        this.anw = data['rows'];
        this.countanwbyID= data['count'];
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
        console.log(this.questions_details)
        this.anwID=[data.id]
        this.getAllByIdQuestions(this.anwID);
        this.answers = this.fb.group({
          question_id: [data.id],
          content: [''],
          customer_id:[data.customer_id]
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
    if (this.answers.invalid) {
      return false;
    }
    const data = {
      content: this.answers.value['content'],
      customer_id:localStorage.getItem('currentUser'),
      question_id:this.answers.value['question_id'],
      status:this.answers.value['status'],
      detail_url:'duong-dan-thong-bao',
    };
    this.answersService.create(data).subscribe(
      (response: any) => {
        this.resetForm();
        this.toastrService.success('Đăng câu trả lời thành công!');
        window.location.reload();
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
