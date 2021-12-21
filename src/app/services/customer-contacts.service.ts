import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import {PremiumService} from "../models/premium-service.model";
import {BlogCategories} from "../models/blog-categories.model";

const API_URL = `${env.apiURL}/customer-contacts`;

@Injectable({
  providedIn: 'root'
})
export class CustomerContactsService {

  constructor(private http: HttpClient) {}
  create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }
  getByCustomerId(id: any, limit: any): Observable<PremiumService> {
    return this.http.get(`${API_URL}/customer/${id}?limit=${limit}&status=both&orderby=desc`);
  }
  get(id: any): Observable<BlogCategories> {
    return this.http.get(`${API_URL}/${id}`);
  }
  requestContact(id: any, data: any): Observable<any> {
    return this.http.post(`${API_URL}/request-contact/${id}`, data);
  }
}
