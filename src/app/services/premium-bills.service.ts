import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { PremiumBills } from '../models/premium-bills.model';

const API_URL = `${env.apiURL}/premium-bills`;

@Injectable({
  providedIn: 'root',
})
export class PremiumBillsService {
  constructor(private http: HttpClient) {}
  create(data: any): Observable<PremiumBills> {
    return this.http.post(API_URL, data);
  }
  get(id: any): Observable<PremiumBills> {
    return this.http.get(`${API_URL}/${id}`);
  }
  getByCustomerId(id: any): Observable<PremiumBills> {
    return this.http.get(`${API_URL}/customer/${id}?status=both`);
  }
}
