import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { PremiumService } from '../models/premium-service.model';
import {BlogCategories} from "../models/blog-categories.model";

const API_URL = `${env.apiURL}/premium-services`;

@Injectable({
  providedIn: 'root',
})
export class PremiumServiceService {
  constructor(private http: HttpClient) {}
  getAllLatest(limit: string): Observable<PremiumService[]> {
    return this.http.get<PremiumService[]>(`${API_URL}?limit=${limit}`);
  }
  get(id: any): Observable<PremiumService> {
    return this.http.get(`${API_URL}/${id}`);
  }
}
