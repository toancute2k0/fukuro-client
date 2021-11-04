import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customers } from '../models/customers.model';
import { environment as env } from '../../environments/environment';

const API_URL = `${env.apiURL}/customers`;

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Customers[]> {
    return this.http.get<Customers[]>(API_URL);
  }

  get(id: number): Observable<Customers> {
    return this.http.get(`${API_URL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(API_URL);
  }

  findByTitle(title: any): Observable<Customers[]> {
    return this.http.get<Customers[]>(`${API_URL}?title=${title}`);
  }
}
