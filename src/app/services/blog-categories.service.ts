import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogCategories } from '../models/blog-categories.model';

const API_URL = 'http://localhost/ASM_PHP31/public/api/blog_categories';

@Injectable({
  providedIn: 'root',
})
export class BlogCategoriesService {
  constructor(private http: HttpClient) {}

  getAllCat(): Observable<BlogCategories[]> {
    return this.http.get<BlogCategories[]>(API_URL);
  }

  get(id: any): Observable<BlogCategories> {
    return this.http.get(`${API_URL}/${id}`);
  }
}
