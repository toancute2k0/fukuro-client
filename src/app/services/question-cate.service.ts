import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionCategories } from '../models/question-cat.model';
import { environment as env } from '../../environments/environment';
import { Question } from '../models/question.model';
const API_URL = `${env.apiURL}/question-categories`;

@Injectable({
  providedIn: 'root',
})
export class QuestionCategoriesService {
  constructor(private http: HttpClient) {}

  getAllCat(): Observable<QuestionCategories[]> {
    return this.http.get<QuestionCategories[]>(API_URL);
  }

  get(id: any): Observable<QuestionCategories> {
    return this.http.get(`${API_URL}/${id}`);
  }

  
}
