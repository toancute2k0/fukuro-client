import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminContactsService } from '../../../services/admin-contacts.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-motel-search',
  templateUrl: './motel-search.component.html',
  styleUrls: ['./motel-search.component.css'],
})
export class MotelSearchComponent implements OnInit {
  declare window: any;

  submitted = false;
  constructor(
    private fb: FormBuilder,
    private adminContactsService: AdminContactsService,
    private _router: Router,
    private toastrService: ToastrService
  ) {}
  search = this.fb.group({
    address: ['', Validators.compose([Validators.required])],
  });
  get f() {
    return this.search.controls;
  }
  ngOnInit(): void {}
  onSearch(): any {
    this.submitted = true;
    if (this.search.invalid) {
      return false;
    }

    // this._router.navigate(['/thue-nha-dat']);
    // console.log(this.search.value);
  }
}
