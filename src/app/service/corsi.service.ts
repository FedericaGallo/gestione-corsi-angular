import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { signal, WritableSignal} from '@angular/core';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Corso {
  id: number;
  nomeCorso: string;
  dataInizio: string;
  dataFine: string;
  nomeDocenteDTO: string;
  cognomeDocenteDTO: string;
  idDocenteDTO : number;
}

@Injectable({
  providedIn: 'root'
})
export class CorsiService {
 url: string = 'http://localhost:8080/docente';
   corsi = signal<Corso[]>([]);
  constructor(private httpClient : HttpClient) { }
  fetchCorsi(page: number) {
    const params = new HttpParams()
      .set('page', page.toString());
    const url = 'http://localhost:8080/corso/findAll';
    const errorMessage = 'errore nella chiamata al server';
     return this.httpClient.get<Corso[]>(url, {params, observe: 'response'})
        .pipe(catchError((error: any)=>{
          return throwError(() => new Error(errorMessage))}));
  }
postCorso(url: string, newCorso: Corso){
   return this.httpClient.post<Corso>(url, newCorso)
      .pipe(
        catchError((error: any) => {
          return throwError(() => error);
        })
      );
  }
deleteCorso(){return 'ciao';}
}
