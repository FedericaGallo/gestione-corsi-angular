import { Injectable } from '@angular/core';

export interface Docente {
  id: number;
  nome: string;
  cognome: string;

  }
@Injectable({
  providedIn: 'root'
})
export class DocentiService {
private docenti: Docente[]= [
  {id: 1, nome: 'Federica', cognome: 'Gallo'},
  {id: 2, nome: 'Gianni', cognome: 'Verdi'},
  {id: 3, nome: 'Maria', cognome: 'Rossi'}
  ]
  constructor() { }

  getDocenti(){
    return this.docenti;
    }

  getDocenteById(id: number){
    return this.docenti.find(corso => corso.id === id);
    }
}
