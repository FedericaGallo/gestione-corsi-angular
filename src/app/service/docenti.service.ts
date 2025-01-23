import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Docente {
  id: number;
  nome: string;
  cognome: string;
  photo: string;
  }

@Injectable({
  providedIn: 'root'
})
export class DocentiService {
private docenti: Docente[]= [
  {id: 1, nome: 'Albert', cognome: 'Einstein', photo: 'AlbertEinstein.jpg'},
  {id: 2, nome: 'Marie', cognome: 'Curie', photo: 'mariecurie.jpg'},
  {id: 3, nome: 'Isaac', cognome: 'Newton', photo: 'Newton.jpg'}
  ]
constructor(private httpClient : HttpClient) {}

  getDocenti(){
    return this.docenti;
    }

  getDocenteById(id: number){
    return this.docenti.find(corso => corso.id === id);
    }

/*getDocentir() {
   const subscribtion = this.httpClient.get<{docenti : Docente[]}>('http://localhost:8080/docente/findAll', {observe: 'response'}).subscribe({
      next: (response) => {
        console.log(response.body?.docenti);
        console.log(response.status);
        }
      });
}*/

getDocentir() {
   const subscribtion = this.httpClient.get<{docenti : Docente[]}>('http://localhost:8080/docente/findAll', {observe: 'response'}).subscribe({
      next: (response) => {
        console.log(response.body);
        console.log(response.status);
        }
      });
}

getDocentiT() {
   const subscribtion = this.httpClient.get<{docente : Docente}>('http://localhost:8080/docente/prova', {observe: 'response'}).subscribe({
      next: (response) => {
        console.log(response.body);
        console.log(response.status);
        }
      });
}
}
