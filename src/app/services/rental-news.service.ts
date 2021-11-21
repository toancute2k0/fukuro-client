import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customers } from '../models/customers.model';
import { environment as env } from '../../environments/environment';

const API_URL = `${env.apiURL}/rental-news`;

@Injectable({
  providedIn: 'root'
})
export class RentalNewsService {

  constructor(private http: HttpClient) {}
  create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }
}
