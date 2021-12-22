import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RentalNewsService } from 'src/app/services/rental-news.service';

@Component({
  selector: 'app-motel-search',
  templateUrl: './motel-search.component.html',
  styleUrls: ['./motel-search.component.css'],
})
export class MotelSearchComponent implements OnInit {
  declare window: any;

  district?: any;
  constructor(
    private fb: FormBuilder,
    private rentalSer: RentalNewsService,
    private router: Router
  ) {}
  search = this.fb.group({
    address: [''],
  });
  get f() {
    return this.search.controls;
  }
  ngOnInit(): void {
    this.rentalSer.getAllDistrict().subscribe((res: any | undefined) => {
      this.district = res['rows'];
      // console.log(res['rows']);
    });
  }

  searchOnchange(event: any) {
    this.rentalSer.getAllDistrict().subscribe((res: any | undefined) => {
      this.district = res['rows'];
      this.router.navigate(['/thue-nha-dat/tim-kiem'], {
        queryParams: { search: res['rows'][event.target.value].district },
      });
      // console.log(res['rows'][event.target.value].district);
    });
  }
}
