import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { PremiumService } from '../models/premium-service.model';

const API_URL = `${env.apiURL}/customer-premium-services`;

@Injectable({
  providedIn: 'root',
})
export class CustomerPremiumServicesService {
  constructor(private http: HttpClient) {}
  getAll(limit: any): Observable<PremiumService[]> {
    return this.http.get<PremiumService[]>(`${API_URL}?limit=${limit}`);
  }
  get(id: any): Observable<PremiumService> {
    return this.http.get(`${API_URL}/${id}`);
  }
  getByCustomerId(id: any, limit: any): Observable<PremiumService> {
    return this.http.get(`${API_URL}/customer/${id}?limit=${limit}&status=both&orderby=desc`);
  }
  checkPremiumByCustomerId(id: any): Observable<PremiumService> {
    return this.http.get(`${API_URL}/check-premium/${id}`);
  }
}
