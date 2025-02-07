import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal, WritableSignal} from '@angular/core';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
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
// docente = signal<DocenteCorsi | null | undefined>(undefined);
//  docente: WritableSignal<DocenteCorsi | null | undefined> = signal<DocenteCorsi | null | undefined>(undefined);
  private docenteSubject = new BehaviorSubject<DocenteCorsi | null>(null);
  docente$ : Observable<DocenteCorsi | null> = this.docenteSubject.asObservable();
constructor(private httpClient : HttpClient) {}

  /*getDocenti(){
    return this.docenti();
    }
  getDocente(){
      return this.docente();
      }*/

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

/*public fetchDocente(url: string) {
   return this.httpClient.get<DocenteCorsi>(url, {observe: 'response'})
      .pipe(catchError((error: any)=>{
        return throwError(() => error);
}))}*/

public getDocente(url: string){
  this.httpClient.get<DocenteCorsi>(url).subscribe((data)=> {
  this.docenteSubject.next(data);
  })

  }
/*public postCorso(){
  this.httpClient.post<DocenteCorsi>(url, newCorso).subscribe((response)=> {
  this.docenteSubject.next([...this.docenteSubject.value.corsi, response]);
  })

  }*/

public postCorso(url: string, newCorso: any) {
  this.httpClient.post<Corso>(url, newCorso).subscribe((response) => {
    const currentValue = this.docenteSubject.value;
    if (currentValue) {
      this.docenteSubject.next({
                                 ...currentValue,
                                 corsi: [...currentValue.corsi, response]
                               });
    }
  });
}
}
