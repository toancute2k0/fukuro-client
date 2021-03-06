import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalNewsService } from 'src/app/services/rental-news.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-edit-rental',
  templateUrl: './edit-rental.component.html',
  styleUrls: ['./edit-rental.component.css'],
})
export class EditRentalComponent implements OnInit {
  linkImg = environment.linkImg;
  id: any;
  submitted = false;
  result = false;
  multipleImages: File[] = [];
  selectedCheck!: boolean;

  fullAddress: string = '';
  streetNumber: string = '';
  street: string = '';
  district: string = '';
  city: string = '';
  Latitude: string = '';
  Longitude: string = '';

  public options: any = {
    componentRestrictions: { country: 'vn' },
  };

  handleAddressChange(address: any) {
    this.fullAddress = address.formatted_address;
    this.Latitude = address.geometry.location.lat();
    this.Longitude = address.geometry.location.lng();

    for (const component of address.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case 'street_number': {
          this.streetNumber = `${component.long_name}`;
          break;
        }

        case 'route': {
          this.street += component.short_name;
          break;
        }

        case 'administrative_area_level_2': {
          this.district = `${component.long_name}`;
          break;
        }

        case 'administrative_area_level_1': {
          this.city = `${component.long_name}`;
          break;
        }
      }
    }
  }

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
  arrDelete: any[] = (this.EditRentalForm.value['image'] = []);
  multipleImagesCus: any[] = (this.EditRentalForm.value['image'] = []);

  constructor(
    private fb: FormBuilder,
    private rentalServe: RentalNewsService,
    private _router: Router,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getData(this.id);
  }

  get f() {
    return this.EditRentalForm.controls;
  }
  getData(id: any): void {
    this.rentalServe.get(id).subscribe(
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
            Validators.compose([
              Validators.required,
              Validators.pattern(/^\d+$/),
            ]),
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
      }
    );
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

  delete(img: any) {
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
    // console.log(this.EditRentalForm.value);
    if (this.EditRentalForm.invalid) {
      return false;
    }
    if (this.flag == true) {
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

    if (this.multipleImages.length === 0) {
      const data = {
        image: JSON.stringify(this.multipleImagesCus),
        name: this.EditRentalForm.value['name'],
        slug: this.EditRentalForm.value['slug'],
        price: this.EditRentalForm.value['price'],
        quantity: this.EditRentalForm.value['quantity'],
        type: this.EditRentalForm.value['type'],
        area: this.EditRentalForm.value['area'],
        address: this.fullAddress,
        street_number: this.streetNumber,
        street: this.street,
        district: this.district,
        city: this.city,
        lat: this.Latitude,
        lng: this.Longitude,
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
    } else {
      this.http
        .post(environment.apiPostImg, formData)
        .toPromise()
        .then((res: any) => {
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
              address: this.fullAddress,
              street_number: this.streetNumber,
              street: this.street,
              district: this.district,
              city: this.city,
              lat: this.Latitude,
              lng: this.Longitude,
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
