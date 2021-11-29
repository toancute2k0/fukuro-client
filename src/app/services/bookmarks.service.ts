import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { Bookmarks } from '../models/bookmarks.model';

const API_URL = `${env.apiURL}/bookmarks`;

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Bookmarks[]> {
    return this.http.get<Bookmarks[]>(API_URL);
  }
  updateBookMark(id: any, data: any): Observable<Bookmarks[]> {
    return this.http.post<Bookmarks[]>(`${API_URL}/customer/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
