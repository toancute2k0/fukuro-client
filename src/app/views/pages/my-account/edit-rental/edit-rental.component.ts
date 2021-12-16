import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
  linkImg = environment.linkImg;
  id: any;
  submitted = false;
  result = false;
  multipleImages: File[] = [];
  // multipleImagesCus : any[];
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
  flag = false;
  arrDelete : any[] = (this.EditRentalForm.value['image'] = []);
  multipleImagesCus: any[] = (this.EditRentalForm.value['image'] = []);

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
          data.image = JSON.parse(data.image);
          this.multipleImagesCus = data.image;
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
    this.multipleImages.splice(this.multipleImages.indexOf(event), 1);
  }

  delete(img: any){
    this.flag = true;
    this.arrDelete.push(img);
    this.multipleImagesCus.splice(this.multipleImagesCus.indexOf(img), 1);
  }

  onSubmit(): any {
    this.submitted = true;
    // return validators
    const formData = new FormData();
    for (let img of this.multipleImages) {
      formData.append('files', img);
    }
    if (this.EditRentalForm.invalid) {
      return false;
    }

    if(this.flag == true){
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          files_name: this.arrDelete,
        },
      };
      this.http.delete(environment.apiDeleteMultipleImg, options).subscribe();

    }

    if (this.multipleImages.length === 0){
      const data = {
        image: JSON.stringify(this.multipleImagesCus),
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
      this.rentalServe.update(this.id, data).subscribe(
        (response: any) => {
          this.multipleImages.length = 0;
          this.toastrService.success(response.message);
        },
        (error) => {
          this.toastrService.error(error.message);
        }
      );
    }else{
      this.http.post(environment.apiPostImg, formData).toPromise().then((res: any) => {
        this.result = true;
        if (this.result == true) {
          for (let img of res) {
            this.multipleImagesCus.push(img.filename);
          }
          const data = {
            image: JSON.stringify(this.multipleImagesCus),
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
          this.rentalServe.update(this.id, data).subscribe(
            (response: any) => {
              this.multipleImages.length = 0;
              this.toastrService.success(response.message);
            },
            (error) => {
              this.toastrService.error(error.message);
            }
          );
        }
      });
    }

  }

}
