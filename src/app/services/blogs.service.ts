import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blogs } from '../models/blogs.model';

const API_URL = 'http://localhost/ASM_PHP31/public/api/blogs';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Blogs[]> {
    return this.http.get<Blogs[]>(API_URL);
  }

  get(id: string): Observable<Blogs> {
    return this.http.get(`${API_URL}/${id}`);
  }

  // findByTitle(title: any): Observable<Blogs[]> {
  //   return this.http.get<Blogs[]>(`${API_URL}?title=${title}`);
  // }
}
