import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customers } from 'src/app/models/customers.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
