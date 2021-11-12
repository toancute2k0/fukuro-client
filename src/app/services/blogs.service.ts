import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blogs } from '../models/blogs.model';
import { BlogCategories } from '../models/blog-categories.model';
import { map, catchError } from 'rxjs/operators';
const API_URL = 'http://toan2000.ml/api/blogs';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(API_URL);
  }

  getById(slug: string): Observable<Blogs | undefined> {
    return this.getAll().pipe(
      map((blogs: Blogs[]) => blogs.find((p) => p.slug === slug))
    );
  }

  getByCatId(slug: any): Observable<BlogCategories | undefined> {
    return this.getAll().pipe(
      map((blogs: BlogCategories[]) => blogs.find((p) => p.slug === slug))
    );
  }
}
