import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogCategories } from '../models/blog-categories.model';
import { environment as env } from '../../environments/environment';

const API_URL = `${env.apiURL}/blog-categories`;

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
