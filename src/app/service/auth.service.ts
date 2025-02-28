import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface Utente {
  nome?: String | null;
  cognome?: String | null;
  email?: String | null;
  password?: String | null;
  }
interface AuthResponse {
  token: string;
  expirationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string ='http://localhost:8080/auth';
  constructor(private httpClient : HttpClient) { }

register(utente: Utente){
  const url = `${this.url}/register`;
  return this.httpClient.post(url, utente)
   .pipe(
        catchError((error: any) => {
          return throwError(() => error);
        })
      );
  }
authenticate(utente: Utente){
  const url = `${this.url}/authenticate`;
  return this.httpClient.post<AuthResponse>(url, utente)
   .pipe(
        catchError((error: any) => {
          return throwError(() => error);
        })
      );
  }
activate(token: string){
  const url = `${this.url}/activate-account`;
  const params = new HttpParams()
      .set('token', token);
  return this.httpClient.get(url, {params})
   .pipe(
        catchError((error: any) => {
          return throwError(() => error);
        })
      );
  }
}
