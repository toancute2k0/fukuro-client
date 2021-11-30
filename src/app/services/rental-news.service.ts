import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { RentalNews } from '../models/rental-news.model';
import { Blogs } from '../models/blogs.model';

const API_URL = `${env.apiURL}/rental-news`;

@Injectable({
  providedIn: 'root',
})
export class RentalNewsService {
  constructor(private http: HttpClient) {}
  create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }
  get(id: any): Observable<RentalNews> {
    return this.http.get(`${API_URL}/${id}`);
  }
  update(id:any,data:any): Observable<RentalNews[]> {
    return this.http.put<RentalNews[]>(`${API_URL}/${id}`, data);
  }
  getBySlug(slug: string): Observable<RentalNews[]> {
    return this.http.get<RentalNews[]>(`${API_URL}/slug/${slug}`);
  }
  getAll(page: any, limit: any): Observable<RentalNews[]> {
    return this.http.get<RentalNews[]>(
      `${API_URL}?page=${page}&limit=${limit}`
    );
  }
  getPriority(limit: number): Observable<RentalNews[]> {
    return this.http.get<RentalNews[]>(`${API_URL}/priority?limit=${limit}`);
  }

  getLatest(): Observable<Blogs> {
    return this.http.get(`${API_URL}/latest`);
  }

  getLatestDetail(limit: number): Observable<RentalNews[]> {
    return this.http.get<RentalNews[]>(`${API_URL}/latest?limit=${limit}`);
  }
  getfindByCustomerId(id: any): Observable<RentalNews> {
    return this.http.get(`${API_URL}/customer/${id}`);
  }
  delete(id:any):Observable<RentalNews> {
    return this.http.delete(`${API_URL}/${id}`);
  }

}
