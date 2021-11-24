import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalNews } from 'src/app/models/rental-news.model';
import { RentalNewsService } from 'src/app/services/rental-news.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-rental-news',
  templateUrl: './rental-news.component.html',
  styleUrls: ['./rental-news.component.css'],
})
export class RentalNewsComponent implements OnInit {
  submitted = false;
  result = false;
  files: File[] = [];
  multipleImages: File[] = [];

  rentalForm = this.fb.group({
    name: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    slug: [''],
    image: ['', Validators.compose([Validators.required])],
    price: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^\d+$/),
      ]),
    ],
    quantity: ['', Validators.compose([Validators.required])],
    type: ['', Validators.compose([Validators.required])],
    area: [
      '',
      Validators.compose([Validators.required, Validators.pattern(/^\d+$/)]),
    ],
    address: [
      '',
      Validators.compose([Validators.required, Validators.minLength(9)]),
    ],
    description: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    status: [''],
  });

  constructor(
    private fb: FormBuilder,
    private rentalServe: RentalNewsService,
    private _router: Router,
    private toastrService: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  get f() {
    return this.rentalForm.controls;
  }

  // Create slug
  modelChangeFn(e: string) {
    const text = this.transform(e);
    this.rentalForm.patchValue({ slug: text });
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

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    if (event.addedFiles.length > 0) {
      this.multipleImages = event.addedFiles;
    }
    this.rentalForm.patchValue({
      image: this.files,
    });
  }

  onRemove(event: any) {
    console.log(event);
    this.multipleImages.splice(this.multipleImages.indexOf(event), 1);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit(): any {
    this.submitted = true;
    // return validators
    const formData = new FormData();
    for (let img of this.multipleImages) {
      formData.append('files', img);
    }
    console.log(this.rentalForm.value);
    // if (this.rentalForm.invalid) {
    //   return false;
    // }

    this.http
      .post(environment.apiPostImg, formData)
      .toPromise()
      .then((res) => {
        this.result = true;
        if (this.result == true) {
          // const data = {
          //   image: JSON.stringify(this.rentalForm.value['image']),
          // };
          // this.rentalServe.create(data).subscribe(
          //   (response) => {
          //     this.toastrService.success('Thêm mới thành công!');
          //   },
          //   (error) => {
          //     this.toastrService.success('Thêm mới thất bại!');
          //   }
          // );
        }
      });
  }
}
