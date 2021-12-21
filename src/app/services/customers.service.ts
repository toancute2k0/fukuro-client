import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Customers } from '../models/customers.model';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';
const API_URL = `${env.apiURL}/customers`;

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  profileImageUpdate$ = new Subject<string>();
  profileUsername$ = new Subject<string>();
  profileId$ = new Subject<number>();
  notifications$ = new Subject<string>();
  constructor(private http: HttpClient) {}

  getAll(): Observable<Customers[]> {
    return this.http.get<Customers[]>(API_URL);
  }

  get(id: string): Observable<Customers> {
    return this.http.get(`${API_URL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(API_URL, data);
  }

  // login(data: any): Observable<any> {
  //   return this.http.post(`${API_URL}/login`, data);
  // }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${API_URL}/login`, {
        username: username,
        password: password,
      })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', user.data['id']);
          }
          return user;
        })
      );
  }

  loginWithGoogle(token: any): Observable<any> {
    return this.http.post(`${API_URL}/login-with-google`, token);
  }

  // loginWithGoogle(token: any) {
  //   return this.http
  //     .post<any>(`${API_URL}/login-with-google`, {
  //       token: token
  //     })
  //     .pipe(
  //       map((user) => {
  //         // login successful if there's a jwt token in the response
  //         if (user && user.token) {
  //           // store user details and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem('currentUser', user.data['id']);
  //         }
  //         return user;
  //       })
  //     );
  // }



  update(id: string, data: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(API_URL);
  }

  findByTitle(title: any): Observable<Customers[]> {
    return this.http.get<Customers[]>(`${API_URL}?title=${title}`);
  }

  authorization() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
  }
  changePassword(data: any): Observable<any> {
    return this.http.post(`${API_URL}/change-password`, data);
  }
  forgotPassword(data: any): Observable<any> {
    return this.http.post(`${API_URL}/forgot-password`, data);
  }
  resetPassword(data: any): Observable<any> {
    return this.http.post(`${env.apiURL}/password-resets/customer`, data);
  }
}
