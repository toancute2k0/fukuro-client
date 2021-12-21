import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { Answers } from '../models/answers.model';
const API_URL = `${env.apiURL}/answers`;
@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  constructor(private http: HttpClient) {}
  create(data: any): Observable<Answers > {
    return this.http.post(API_URL, data);
  }
  getAllByIdQuestions(question_id: string): Observable<Answers[]> {
    return this.http.get<Answers[]>(`${API_URL}/question/${question_id}`);
  }
  getAll(page: any, limit: any): Observable< Answers[]> {
    console.log(page,limit);
    return this.http.get< Answers[]>(
      `${API_URL}?page=${page}&limit=${limit}`
    );
  }
  updatelike(id: any, data: any): Observable<Answers[]> {
    return this.http.put<Answers[]>(`${API_URL}/${id}/like`, data);
  }
  updatedisklike(id: any, data: any): Observable<Answers[]> {
    return this.http.put<Answers[]>(`${API_URL}/${id}/dislike`, data);
  }
}
