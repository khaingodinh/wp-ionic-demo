import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SessionService } from './sessionStore';

@Injectable()
export class ApiService {
  private baseURL = 'http://18.139.140.123:8000/wp-json';

  constructor(private http: HttpClient, private session: SessionService) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    const session = this.session.getSnapshot();
    if (session && session.accessToken) {
      headers = headers.set('Authorization', `Bearer ${session.accessToken}`);
    }

    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.session.removeSession();
    }
    throw new Error('Something bad happened; please try again later.');
  }

  get<T>(url: string) {
    const headers = this.getHeaders();
    return this.http.get<T>(`${this.baseURL}/${url}`, { headers })
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .toPromise();
  }

  post<T>(url: string, data: any) {
    const headers = this.getHeaders();
    return this.http.post<T>(`${this.baseURL}/${url}`, data, { headers })
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .toPromise();
  }

  // Add other HTTP methods as needed (put, delete, etc.)
}