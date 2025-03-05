import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';

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
  constructor(private httpClient : HttpClient, private tokenService : TokenService) {
  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expirationDate');
  var dateObject;
  if(expirationDate){
   dateObject = new Date(expirationDate);
   }
  if (token && dateObject && this.tokenService.isLogged(dateObject)){
    console.log(expirationDate);
      this.subject.next(true);
  }else{
   this.subject.next(false);
    }
}
ngOnInit(){
    const token = localStorage.getItem('token');
    if (token){
        this.subject.next(true);
    }else{
     this.subject.next(false);
      }
  }
public logIn(){
  this.subject.next(true);
  }
public logOut(){
  this.subject.next(false);
  }
public isAdmin(): boolean{
  const ruolo = localStorage.getItem('ruolo');
  if(ruolo){
     return ruolo.includes("ADMIN");
    }else return false;
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

