import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { map } from 'rxjs/operators';

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

private subject = new BehaviorSubject<string>("");
  token$ : Observable<string> =  this.subject.asObservable();
  isLoggedIn$ : Observable<boolean>;
  url: string ='http://localhost:8080/auth';
  constructor(private httpClient : HttpClient, private tokenService : TokenService) {
 this.isLoggedIn$ = this.token$.pipe(map(token => !!token && token.trim() !== ''));

   this.initializeFromStorage();
    }

    private initializeFromStorage(): void {

      if (this.isLocalStorageAvailable()) {
        const token = localStorage.getItem("token");
        if (token) {
          this.subject.next(token);
          console.log(this.isLoggedIn$.subscribe())
        }
      }
    }

    private isLocalStorageAvailable(): boolean {

      if (typeof window === 'undefined') {
        return false;
      }else {
        return true;
        }
    }
ngOnInit(){}
public logIn(token: string){
  this.subject.next(token);
  }
public logOut(){
  this.subject.next("");
  }
public isAdmin(): boolean{
  var ruolo;
  if(typeof window !== 'undefined' && window.localStorage){
   ruolo = localStorage.getItem('ruolo');
    }
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

