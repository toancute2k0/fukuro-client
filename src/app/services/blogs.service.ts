import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Blogs } from '../models/blogs.model';
import { BlogCategories } from '../models/blog-categories.model';
import { environment as env } from '../../environments/environment';
const API_URL = `${env.apiURL}/blogs`;

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: HttpClient) {}

  getAll(page: any, limit: any): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(
      `${API_URL}?page=${page}&limit=${limit}`
    );
  }

  get(id: any): Observable<BlogCategories> {
    return this.http.get(`${API_URL}/${id}`);
  }

  getAllLatest(limit: string): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(`${API_URL}/latest?limit=${limit}`);
  }

  getBySlug(slug: string): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(`${API_URL}/slug/${slug}`);
  }

  getLatest(): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(`${API_URL}/latest?limit=3`);
  }

  getByCatId(id: number, page: any, limit: any): Observable<Blogs | undefined> {
    return this.http.get(`${API_URL}/category/${id}?page=${page}&limit=${limit}`);
  }
}
