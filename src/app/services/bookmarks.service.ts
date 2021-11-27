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
  updateBookMark(
    customer_id: string,
    rental_news: string
  ): Observable<Bookmarks[]> {
    return this.http.post<Bookmarks[]>(
      `${API_URL}/customer/${customer_id}`,
      rental_news
    );
  }
}
