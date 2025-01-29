import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Docente {
  id: number;
  nome: string;
  cognome: string;
  photo: string;
  }

export interface DocenteCorsi {
  id: number;
  nome: string;
  cognome: string;
  corsi: Corso[];
  }

export interface Corso {
  id: number;
  nomeCorso: string;
  dataInizio: string;
  dataFine: string;
  }

@Injectable({
  providedIn: 'root'
})
export class DocentiService {
  docenti = signal<Docente[] | null | undefined>(undefined);
/*private docenti: Docente[] | null = [
  {id: 1, nome: 'Albert', cognome: 'Einstein', photo: 'AlbertEinstein.jpg'},
  {id: 2, nome: 'Marie', cognome: 'Curie', photo: 'mariecurie.jpg'},
  {id: 3, nome: 'Isaac', cognome: 'Newton', photo: 'Newton.jpg'}
  ]*/

constructor(private httpClient : HttpClient) {}

  getDocenti(){
    return this.docenti();
    }

/*getDocenti() {
   const subscribtion = this.httpClient.get<{docenti : Docente[]}>('http://localhost:8080/docente/findAll', {observe: 'response'}).subscribe({
      next: (response) => {
        console.log(response.body?.docenti);
        console.log(response.status);
        }
      });
}*/

loadDocenti(){
  return this.fetchDocenti('http://localhost:8080/docente/findAll','errore nella chiamata al server')
  }

// 'operatore catchError intercetta eventuali errori che potrebbero verificarsi durante la richiesta HTTP. throwError restituisce un observable che emette un errore.
private fetchDocenti(url: string, errorMessage: string) {
   return this.httpClient.get<Docente[]>(url, {observe: 'response'})
      .pipe(catchError((error: any)=>{
        return throwError(() => new Error(errorMessage))}));
}

public fetchDocente(url: string) {
   return this.httpClient.get<DocenteCorsi>(url, {observe: 'response'})
      .pipe(catchError((error: any)=>{
        return throwError(() => error);
}))}

}
