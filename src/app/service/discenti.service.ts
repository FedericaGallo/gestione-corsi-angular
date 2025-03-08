import { Injectable } from '@angular/core';
import { Corso } from './corsi.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { signal, WritableSignal } from '@angular/core';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

export interface Discente {
  id: number;
  nome: string;
  cognome: string;
  matricola: string;
  dataDiNascita: string;
  corsiSeguiti: Corso[];
  corsiSeguitiId: number[];
}
interface CorsoId {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class DiscentiService {
  baseUrl: string = 'http://localhost:8080';
  url: string = 'http://localhost:8080/discente';
  discenti = signal<Discente[]>([]);
  private discenteSubject = new BehaviorSubject<Discente | null>(null);
  discente$: Observable<Discente | null> = this.discenteSubject.asObservable();

  constructor(private httpClient: HttpClient) {}
  fetchDiscenti(page: number) {
    const params = new HttpParams().set('page', page.toString());
    const url = 'http://localhost:8080/discente/findAllPagination';
    const errorMessage = 'errore nella chiamata al server';
    return this.httpClient.get<Discente[]>(url, { params, observe: 'response' }).pipe(
      catchError((error: any) => {
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  public getDiscente(url: string) {
    this.httpClient.get<Discente>(url).subscribe((data) => {
      this.discenteSubject.next(data);
    });
  }
  postDiscente(url: string, newDiscente: Discente) {
    return this.httpClient.post<Discente>(url, newDiscente).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
  deleteDiscente(id: number) {
    const url = `${this.url}/deleteDiscente/${id}`;
    return this.httpClient.delete<Discente>(url).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
  public updateDiscente(id: number, updatedDiscente: Discente) {
    const url = `${this.url}/updateDiscente/${id}`;
    return this.httpClient.put<Discente>(url, updatedDiscente).pipe(
      tap((response) => {
        this.discenteSubject.next(response);
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  public iscriviDiscente(id: number, corsi: number[]) {
    const url = `${this.baseUrl}/discente/${id}/iscrivi`;
    return this.httpClient.put<Discente>(url, corsi).pipe(
      tap((response) => {
        this.discenteSubject.next(response);
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  public getCorsiNonSeguiti(id: number) {
    const url = `http://localhost:8080/discente/${id}/corsi-disponibili`;
    return this.httpClient.get<Corso[]>(url).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  unsubscribe(idCorso: number, idDiscente: number) {
    const url = `${this.baseUrl}/corso/removeDiscente/${idCorso}`;
    const discente = { id: idDiscente };
    return this.httpClient.put<Discente>(url, discente).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
}
