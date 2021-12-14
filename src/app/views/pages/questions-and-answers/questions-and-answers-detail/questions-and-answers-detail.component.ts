import { Component, OnInit } from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  NgbCollapse,
} from '@ng-bootstrap/ng-bootstrap';
import { BlogCategories } from 'src/app/models/blog-categories.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionCategoriesService } from 'src/app/services/question-cate.service';
import { Validators, FormBuilder } from '@angular/forms';
import { CustomersService } from 'src/app/services/customers.service';
import { Customers } from 'src/app/models/customers.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-questions-and-answers-detail',
  templateUrl: './questions-and-answers-detail.component.html',
  styleUrls: ['./questions-and-answers-detail.component.css'],
  providers: [NgbModalConfig, NgbModal, NgbCollapse],
})
export class QuestionsAndAnswersDetailComponent implements OnInit {
  cat?: BlogCategories[];
  submitted = false;
  avatar: string | undefined;
  username: string | undefined;
  name:string | undefined;

  public isCollapsed: any;
  public isCollapsed2: any;
  constructor(
    
    config: NgbModalConfig,
    private modalService: NgbModal,
    private catQuestions: QuestionCategoriesService,
    private route: ActivatedRoute,
    public ngbCollapse: NgbCollapse,
    public fb: FormBuilder,
    private customSer: CustomersService,
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  answers = this.fb.group({
    content: ['', Validators.compose([Validators.required])],
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
    this.isCollapsed = true;
    this.isCollapsed2 = true;
    const slug = this.route.snapshot.paramMap.get('slug');
    this.catQuestions.getAllCat().subscribe((res: any | undefined) => {
      this.cat = res['rows'];
    });
  }
  getById(id: string): void {
    this.customSer.get(id).subscribe((res) => {
      this.avatar = environment.linkImg+res['avatar'];
      this.name = res['firstName'] + ' ' + res['lastName'];
      this.username = res['username'];
    });
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
  }
  resetForm(): void {
    this.submitted = false;
  }
}
