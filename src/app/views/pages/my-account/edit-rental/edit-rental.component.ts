import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalNewsService } from 'src/app/services/rental-news.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit-rental',
  templateUrl: './edit-rental.component.html',
  styleUrls: ['./edit-rental.component.css']
})
export class EditRentalComponent implements OnInit {
  id: any;
  submitted = false;
  result = false;
  multipleImages: File[] = [];
  selectedCheck!: boolean;
  EditRentalForm = this.fb.group({
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
  RentalNewsService: any;

  constructor(
    private fb: FormBuilder,
    private rentalServe: RentalNewsService,
    private _router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getData(this.id);
  }

  get f() {
    return this.EditRentalForm.controls;
  }
  getData(id: any): void {
    this.rentalServe.get(id)
      .subscribe(
        (data: any) => {
          for (var i = 0; i < data.length; i++) {
            data[i].image = JSON.parse(data[i].image);
          }
          this.EditRentalForm = this.fb.group({
            name: [
              data.name,
              Validators.compose([Validators.required, Validators.minLength(6)]),
            ],
            slug: [data.slug],
            image: [data.image, Validators.compose([Validators.required])],
            price: [
              data.price,
              Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.pattern(/^\d+$/),
              ]),
            ],
            quantity: [data.quantity, Validators.compose([Validators.required])],
            type: [data.type, Validators.compose([Validators.required])],
            area: [
              data.area,
              Validators.compose([Validators.required, Validators.pattern(/^\d+$/)]),
            ],
            address: [
              data.address,
              Validators.compose([Validators.required, Validators.minLength(9)]),
            ],
            description: [
              data.description,
              Validators.compose([Validators.required, Validators.minLength(6)]),
            ],
            status: [data.status],
          });
        },
        (error: any) => {
          console.log(error);
        });
  }
  // Create slug
  modelChangeFn(e: string) {
    const text = this.transform(e);
    this.EditRentalForm.patchValue({ slug: text });
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
    this.EditRentalForm.patchValue({
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
    // console.log(this.EditRentalForm.value);
    if (this.EditRentalForm.invalid) {
      return false;
    }
    const data = {
      image: this.EditRentalForm.value['image'],
      name: this.EditRentalForm.value['name'],
      slug: this.EditRentalForm.value['slug'],
      price: this.EditRentalForm.value['price'],
      quantity: this.EditRentalForm.value['quantity'],
      type: this.EditRentalForm.value['type'],
      area: this.EditRentalForm.value['area'],
      address: this.EditRentalForm.value['address'],
      description: this.EditRentalForm.value['description'],
      customerId: localStorage.getItem('currentUser'),
    };
    this.rentalServe.update(this.id,data).subscribe(
      (res) => {
        this.toastrService.success('Cập nhật thành công!');
      },
      (error) => {
        this.toastrService.error('Cập nhật thất bại!');
      }
    );
  }
 
}
