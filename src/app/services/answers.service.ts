import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { Comments } from '../models/comments.model';
const API_URL = `${env.apiURL}/answers`;
@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  constructor(private http: HttpClient) {}
  create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }

  getAllByIdQuestions(id: string): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${API_URL}/questions/${id}`);
  }
}
