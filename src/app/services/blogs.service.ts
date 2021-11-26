import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blogs } from '../models/blogs.model';
import { BlogCategories } from '../models/blog-categories.model';
import { map, catchError } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
const API_URL = `${env.apiURL}/blogs`;

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(API_URL);
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

  // getById(slug: string): Observable<Blogs | undefined> {
  //   return this.getAll().pipe(
  //     map((blogs: Blogs[]) => blogs.find((p) => p.slug === slug))
  //   );
  // }

  // getByCatId(slug: any): Observable<BlogCategories | undefined> {
  //   return this.getAll().pipe(
  //     map((blogs: BlogCategories[]) => blogs.find((p) => p.slug === slug))
  //   );
  // }

  getByCatId(id: number): Observable<Blogs | undefined> {
    return this.http.get(`${API_URL}/category/${id}`);
  }
}
