import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalNews } from 'src/app/models/rental-news.model';
import { RentalNewsService } from 'src/app/services/rental-news.service';
import { environment } from 'src/environments/environment';
import { CustomerPremiumServicesService } from '../../../services/customer-premium-services.service';

@Component({
  selector: 'app-rental-news',
  templateUrl: './rental-news.component.html',
  styleUrls: ['./rental-news.component.css'],
})
export class RentalNewsComponent implements OnInit {
  submitted = false;
  result = false;
  multipleImages: File[] = [];
  selectedCheck!: boolean;
  id: any;
  fullAddress: string = '';
  streetNumber: string = '';
  street: string = '';
  district: string = '';
  city: string = '';
  Latitude: string = '';
  Longitude: string = '';
  expire = true;
  expireCus: any;
  linkClient = environment.url;

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
          // console.log(this.streetNumber);
          break;
        }

        case 'route': {
          this.street += component.short_name;
          // console.log(this.street);
          break;
        }

        case 'administrative_area_level_2': {
          this.district = `${component.long_name}`;
          // console.log(this.district);
          break;
        }

        case 'administrative_area_level_1': {
          this.city = `${component.long_name}`;
          // console.log(this.city);
          break;
        }
      }
    }
  }

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
    private http: HttpClient,
    private customerPremiumServicesService: CustomerPremiumServicesService,
    private rentalNewsService: RentalNewsService,
    private titleService: Title
  ) {
    this.titleService.setTitle('????ng tin cho thu??');
  }

  ngOnInit(): void {
    this.expireCus = [];
    this.id = localStorage.getItem('currentUser');
  }

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
    this.rentalForm.patchValue({
      image: this.multipleImages,
    });
  }

  // getData(): void {
  //   this.customerPremiumServicesService
  //     .checkPremiumByCustomerId(this.id)
  //     .subscribe((data: any | undefined) => {
  //       if (data['count'] == 0) {
  //         this.rentalNewsService
  //           .getfindByCustomerId(this.id)
  //           .subscribe((res: any | undefined) => {
  //             if (res['count'] >= 3) {
  //               this.expire = true;
  //             }
  //           });
  //       } else {
  //         for (let item of data['rows']) {
  //           if (item.PremiumService.type == 1) {
  //             this.expire = false;
  //           }
  //         }
  //       }
  //     });
  // }

  onRemove(event: any) {
    // console.log(event);
    // console.log(this.multipleImages);
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
            address: this.fullAddress,
            street_number: this.streetNumber,
            street: this.street,
            district: this.district,
            city: this.city,
            lat: this.Latitude,
            lng: this.Longitude,
            description: this.rentalForm.value['description'],
            customer_id: localStorage.getItem('currentUser'),
          };
          this.rentalServe.create(data).subscribe(
            (res) => {
              this.resetForm();
              this.multipleImages.length = 0;
              this.toastrService.success('Th??m m???i th??nh c??ng!');
            },
            (error) => {
              this.toastrService.error(error.error.message);
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
}
