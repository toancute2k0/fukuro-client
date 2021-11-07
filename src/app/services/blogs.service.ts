import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blogs } from '../models/blogs.model';
import { map, catchError } from 'rxjs/operators';
const API_URL = 'http://localhost/ASM_PHP31/public/api/blogs';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(API_URL);
  }

  // get(slug: any): Observable<Blogs> {
  //   return this.http.get(`${API_URL}/${slug}`);
  // }

  getById(slug: string): Observable<Blogs | undefined> {
    return this.getAll().pipe(
      map((blogs: Blogs[]) => blogs.find((p) => p.slug === slug))
    );
  }
}
