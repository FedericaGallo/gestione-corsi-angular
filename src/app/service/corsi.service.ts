import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { signal, WritableSignal } from '@angular/core';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Discente } from './discenti.service';
import { tap } from 'rxjs/operators';

export interface Corso {
  id: number;
  nomeCorso: string;
  dataInizio: string;
  dataFine: string;
  nomeDocenteDTO: string;
  cognomeDocenteDTO: string;
  idDocenteDTO: number;
  discenti: Discente[];
}

@Injectable({
  providedIn: 'root',
})
export class CorsiService {
  url: string = 'http://localhost:8080/corso';
  baseUrl: string = 'http://localhost:8080';
  corsi = signal<Corso[]>([]);
  private corsoSubject = new BehaviorSubject<Corso | null>(null);
  corso$: Observable<Corso | null> = this.corsoSubject.asObservable();
  constructor(private httpClient: HttpClient) {}
  public getCorso(url: string) {
    this.httpClient.get<Corso>(url).subscribe((data) => {
      this.corsoSubject.next(data);
    });
  }
  fetchCorsi(page: number) {
    const params = new HttpParams().set('page', page.toString());
    const url = 'http://localhost:8080/corso/findAll';
    const errorMessage = 'errore nella chiamata al server';
    return this.httpClient.get<Corso[]>(url, { params, observe: 'response' }).pipe(
      catchError((error: any) => {
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  postCorso(url: string, newCorso: Corso) {
    return this.httpClient.post<Corso>(url, newCorso).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
  deleteCorso(id: number) {
    const url = `${this.url}/deleteCorso/${id}`;
    return this.httpClient.delete<Corso>(url).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
  public updateCorso(id: number, updatedCorso: Corso) {
    const url = `${this.url}/updateCorso/${id}`;
    return this.httpClient.put<Corso>(url, updatedCorso).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  public getDiscentiNonIscritti(id: number) {
    const url = `http://localhost:8080/corso/${id}/discenti-disponibili`;
    return this.httpClient.get<Discente[]>(url).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  public iscriviAlCorso(id: number, discenti: number[]) {
    const url = `${this.baseUrl}/corso/${id}/iscrivi`;
    return this.httpClient.put<Corso>(url, discenti).pipe(
      tap((response) => {
        this.corsoSubject.next(response);
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
}
