import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';

export interface Utente {
  nome?: String | null;
  cognome?: String | null;
  email?: String | null;
  password?: String | null;
  }
interface AuthResponse {
  token: string;
  expirationDate: string;
  ruoli: String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private subject = new BehaviorSubject<boolean>(false);
token$ : Observable<boolean> =  this.subject.asObservable();
  ruolo: string = '';
  url: string ='http://localhost:8080/auth';
  constructor(private httpClient : HttpClient) {
const token = localStorage.getItem('token');
if (token){
this.subject.next(true);
  }
}

logIn(){
  this.subject.next(true);
  }
public isAdmin(): boolean{
 return this.ruolo.includes("ADMIN");
  }
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

