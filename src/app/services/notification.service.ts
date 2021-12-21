import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import {PremiumService} from "../models/premium-service.model";
import {BlogCategories} from "../models/blog-categories.model";

const API_URL = `${env.apiURL}/customer-notifications`;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}
  create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }
  getByCustomerId(id: any, limit: any, status: any): Observable<PremiumService> {
    return this.http.get(`${API_URL}/customer/${id}?limit=${limit}&status=${status}&orderby=desc`);
  }
  get(id: any): Observable<BlogCategories> {
    return this.http.get(`${API_URL}/${id}`);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(API_URL);
  }
}
