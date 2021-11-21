import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalNews } from 'src/app/models/rental-news.model';
import { RentalNewsService } from 'src/app/services/rental-news.service';
@Component({
  selector: 'app-rental-news',
  templateUrl: './rental-news.component.html',
  styleUrls: ['./rental-news.component.css'],
})
export class RentalNewsComponent implements OnInit {
  submitted = false;
  Rental_form = this.fb.group({
    name: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    image: [''],
    quantity: [''],
    type: [''],
    status: [''],
    price: ['', Validators.compose([Validators.required])],
    address: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    description: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private rentalServe: RentalNewsService,
    private _router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  get f() {
    return this.Rental_form.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    // return validators
    console.log(this.Rental_form.value);
    if (this.Rental_form.invalid) {
      return false;
    }
    this.rentalServe.create(this.Rental_form.value).subscribe(
      (res) => {
        console.log(res);
        this._router.navigate(['/thue-nha-dat']);
        this.toastrService.success('Đăng bài tin thành công!');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
