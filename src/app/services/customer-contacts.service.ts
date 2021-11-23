import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

const API_URL = `${env.apiURL}/customer-contacts`;

@Injectable({
  providedIn: 'root'
})
export class AdminContactsService {

  constructor(private http: HttpClient) {}
  create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }
}
