import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { RentalNews } from '../models/rental-news.model';
import { Question } from '../models/question.model';

const API_URL = `${env.apiURL}/questions`;
@Injectable({
    providedIn: 'root',
  })
  export class QuestionService {
    constructor(private http: HttpClient) {}
    create(data: any): Observable<Question> {
      return this.http.post(API_URL, data);
    }
  }