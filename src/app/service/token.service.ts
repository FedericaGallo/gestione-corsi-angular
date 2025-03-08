import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  set token(token: string) {
    localStorage.setItem('token', token);
  }

  set expirationDate(expirationDate: string) {
    localStorage.setItem('expirationDate', expirationDate);
  }

  set ruolo(ruolo: string) {
    localStorage.setItem('ruolo', ruolo);
  }
  get ruolo() {
    return localStorage.getItem('ruolo') as string;
  }
  get token() {
    return localStorage.getItem('token') as string;
  }
  get expirationDate() {
    return localStorage.getItem('expirationDate') as string;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('ruolo');
  }
  public isLoggedIn() {
    return moment().isBefore(this.expirationDate);
  }

  public isLogged(expirationDate: Date) {
    return moment().isBefore(expirationDate);
  }
}
