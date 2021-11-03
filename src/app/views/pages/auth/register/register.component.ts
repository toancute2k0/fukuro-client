import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customers } from 'src/app/models/customers.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  customers: Customers = {
    username: '',
    password: '',
    email: '',
    status: '1',
  };
  submitted = false;

  constructor(
    private customersService: CustomersService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  saveCustomers(): void {
    const data = {
      username: this.customers.username,
      password: this.customers.password,
      email: this.customers.email,
    };

    this.customersService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        this._router.navigate(['/trang-chu']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newCustomers(): void {
    this.submitted = false;
    this.customers = {
      username: '',
      password: '',
      email: '',
      status: '1',
    };
  }
}
