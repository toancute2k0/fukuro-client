import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { RentalNews } from '../models/rental-news.model';
import { Comments } from '../models/comments.model';
const API_URL = `${env.apiURL}/comments`;

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}
  create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }

  getAllByIdBlog(id: string): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${API_URL}/blog/${id}`);
  }
  // getAll(page: any, limit: any): Observable<RentalNews[]> {
  //   return this.http.get<RentalNews[]>(`${API_URL}?page=${page}&limit=${limit}`);
  // }
}
