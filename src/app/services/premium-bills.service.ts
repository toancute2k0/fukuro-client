import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { PremiumBills } from '../models/premium-bills.model';
import { PremiumService } from '../models/premium-service.model';

const API_URL = `${env.apiURL}/premium-bills`;
const API_ = `${env.apiURL}/premium-services`;

@Injectable({
  providedIn: 'root',
})
export class PremiumBillsService {
  constructor(private http: HttpClient) {}
  create(data: any): Observable<PremiumBills> {
    return this.http.post(API_URL, data);
  }

  getById(id: string): Observable<PremiumBills[]> {
    return this.http.get<PremiumBills[]>(`${API_URL}/customer/${id}`);
  }

  getId(id: string): Observable<PremiumBills[]> {
    return this.http.get<PremiumBills[]>(`${API_URL}/${id}`);
  }

  getPremiumId(id: string): Observable<PremiumService[]> {
    return this.http.get<PremiumService[]>(`${API_}/${id}`);
  }
}
