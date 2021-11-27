import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalNewsService } from 'src/app/services/rental-news.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit-rental',
  templateUrl: './edit-rental.component.html',
  styleUrls: ['./edit-rental.component.css']
})
export class EditRentalComponent implements OnInit {
  id:'';
  submitted = false;
  result = false;
  multipleImages: File[] = [];
  selectedCheck!: boolean;

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
    this.multipleImages.push(...event.addedFiles);
    if (event.addedFiles.length > 0) {
      this.multipleImages = event.addedFiles;
    }
    this.rentalForm.patchValue({
      image: this.multipleImages,
    });
  }

  onRemove(event: any) {
    console.log(event);
    console.log(this.multipleImages);
    this.multipleImages.splice(this.multipleImages.indexOf(event), 1);
  }

  onSubmit(): any {
    this.submitted = true;
    // return validators
    const formData = new FormData();
    for (let img of this.multipleImages) {
      formData.append('files', img);
    }
    // console.log(this.rentalForm.value);
    if (this.rentalForm.invalid) {
      return false;
    }

    this.http
      .post(environment.apiPostImg, formData)
      .toPromise()
      .then((res: any) => {
        this.result = true;
        if (this.result == true) {
          const imgFile: any[] = (this.rentalForm.value['image'] = []);
          for (let img of res) {
            imgFile.push(img.filename);
          }
          const data = {
            image: JSON.stringify(imgFile),
            name: this.rentalForm.value['name'],
            slug: this.rentalForm.value['slug'],
            price: this.rentalForm.value['price'],
            quantity: this.rentalForm.value['quantity'],
            type: this.rentalForm.value['type'],
            area: this.rentalForm.value['area'],
            address: this.rentalForm.value['address'],
            description: this.rentalForm.value['description'],
            customer_id: localStorage.getItem('currentUser'),
          };
          this.rentalServe.create(data).subscribe(
            (res) => {
              this.resetForm();
              this.multipleImages.length = 0;
              this.toastrService.success('Thêm mới thành công!');
            },
            (error) => {
              this.toastrService.error('Thêm mới thất bại!');
            }
          );
        }
      });
  }

  resetForm(): void {
    this.submitted = false;
    this.rentalForm = this.fb.group({
      name: [''],
      slug: [''],
      image: [''],
      price: [''],
      quantity: [''],
      type: [''],
      area: [''],
      address: [''],
      description: [''],
      status: [''],
    });
  }
  //get old data
  getData(id): void {
    this.RentalNewsService.get(id)
      .subscribe(
        data => {
          this.customers = this.fb.group({
            avatar: [data.avatar, Validators.compose([Validators.required, Validators.minLength(6)])],
            username: [data.username, Validators.compose([Validators.required])],
            email: [data.email, Validators.compose([Validators.required, Validators.email])],
            firstName: [data.firstName, Validators.compose([Validators.required])],
            lastName: [data.lastName, Validators.compose([Validators.required])],
            phone: [data.phone, Validators.compose([Validators.required, Validators.pattern('[0-9 ]{10}')])],
            status: [data.status],
          });
        },
        error => {
          console.log(error);
        });
  }
}
