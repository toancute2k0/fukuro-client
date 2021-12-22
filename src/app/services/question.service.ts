import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { Question } from '../models/question.model';
import { Answers } from '../models/answers.model';
const API_URL = `${env.apiURL}/questions`;
@Injectable({
    providedIn: 'root',
  })
  export class QuestionService {
    constructor(private http: HttpClient) {}
    create(data: any): Observable<Question> {
      return this.http.post(API_URL, data);
    }
    getAll(page: any, limit: any): Observable<Question[]> {
      return this.http.get<Question[]>(
        `${API_URL}?page=${page}&limit=${limit}&orderby=desc`
      );
    }
    getQtsByID(id_qts: string): Observable<Question[]> {
      return this.http.get<Question[]>(`${API_URL}/${id_qts}&orderby=desc`);
    }
    getLatest(): Observable<Question[]> {
      return this.http.get<Question[]>(`${API_URL}/latest?limit=10`);
    }
    getAllByIdCat(cat_id: string): Observable<Answers[]> {
      return this.http.get<Answers[]>(`${API_URL}/category/${cat_id}&orderby=desc`);
    }
  }