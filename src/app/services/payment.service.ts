import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import {RentalNews} from "../models/rental-news.model";

const API_URL = `${env.apiURL}/payment`;

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  constructor(private http: HttpClient) {}

  payment(data: any): Observable<any> {
    return this.http.post(`${API_URL}`, data);
  }

  result(): Observable<any> {
    return this.http.get(`${API_URL}/result`);
  }

}
