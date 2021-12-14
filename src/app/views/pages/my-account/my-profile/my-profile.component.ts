import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/services/customers.service';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  submitted = false;
  dynamicVariable = true;
  images : any;
  id : any;
  result = false;
  updateCus = this.fb.group({
    username: [
      { value: '', disabled: true },
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    firstName: ['', Validators.compose([Validators.required])],
    lastName: ['', Validators.compose([Validators.required])],
    phone: ['', Validators.compose([Validators.required])],
    avatar: [''],
    avatarCus: [''],
  });
  constructor(
    private fb: FormBuilder,
    private customSer: CustomersService,
    private _router: Router,
    private toastrService: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('currentUser');
    this.customSer.get(this.id).subscribe((res) => {
      let user = res;
      this.updateCus = this.fb.group({
        id: [user.id],
        username: [
          user.username,
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        email: [
          user.email,
          Validators.compose([Validators.required, Validators.email]),
        ],
        firstName: [user.firstName, Validators.compose([Validators.required])],
        lastName: [user.lastName, Validators.compose([Validators.required])],
        phone: [user.phone, Validators.compose([Validators.required])],
        avatar: [environment.linkImg+user.avatar],
        avatarCus: [user.avatar],
      });
    });
  }

  get f() {
    return this.updateCus.controls;
  }

  openFilterSearch() {
    let textArea = document.getElementById(
      'filter_search'
    ) as HTMLTextAreaElement;
    if (textArea.style.display == 'none') {
      textArea.style.display = 'block';
    } else {
      textArea.style.display = 'none';
    }
  }

  // Image Preview
  showPreview(event: any){
    if (event.target.files.length > 0) {
      const file2 = event.target.files[0];
      this.images = file2;
    }
    // const f = event.target as HTMLInputElement | undefined;
    const file = event.target.files[0];
    this.updateCus.patchValue({
      avatar: file,
    });

    // this.updateCus.get('avatar').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.updateCus.patchValue({
        avatar: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): any {
    const formData = new FormData();
    formData.append('file', this.images);
    this.submitted = true;
    const id = localStorage.getItem('currentUser');
    if (this.updateCus.invalid) {
      return false;
    }
    if(this.images == null){
      const data = {
        avatar: this.updateCus.value['avatarCus'],
        username: this.updateCus.value['username'],
        email: this.updateCus.value['email'],
        first_name: this.updateCus.value['firstName'],
        last_name: this.updateCus.value['lastName'],
        phone: this.updateCus.value['phone'],
        status: this.updateCus.value['status'],
      };
      this.customSer.update(this.id, data).subscribe(
        (response) => {
          this.submitted = true;
          const name = this.updateCus.value['firstName']+' '+this.updateCus.value['lastName'];
          this.customSer.profileImageUpdate$.next(this.updateCus.value['avatar']);
          this.customSer.profileName$.next(name);
          this.toastrService.success(response.message);
        },
        (error) => {
          this.toastrService.success(error.message);
        });
    }else{
      this.customSer.get(this.id).toPromise().then(
        data => {
          const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: {
              file_name: data.avatar,
            },
          };
          this.http.delete(environment.apiDeleteImg, options).subscribe();
        });
      this.http.post(environment.apiPostOneImg, formData).toPromise().then((res: any) => {
        this.result = true;
        if(this.result == true){
          const data = {
            avatar: res['filename'],
            username: this.updateCus.value['username'],
            email: this.updateCus.value['email'],
            first_name: this.updateCus.value['firstName'],
            last_name: this.updateCus.value['lastName'],
            phone: this.updateCus.value['phone'],
            status: this.updateCus.value['status'],
          };
          this.customSer.update(this.id, data).subscribe(
            (response) => {
              this.submitted = true;
              const name = this.updateCus.value['firstName']+' '+this.updateCus.value['lastName'];
              this.customSer.profileImageUpdate$.next(environment.linkImg+res['filename']);
              this.customSer.profileName$.next(name);
              this.toastrService.success(response.message);
            },
            (error) => {
              this.toastrService.error(error.message);
            });
        }
      });
    }
  }
}
