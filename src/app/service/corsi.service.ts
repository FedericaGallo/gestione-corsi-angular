import { Injectable } from '@angular/core';
interface Corso {
  id: number;
  nome: string;
  descrizione: string;
  docente: string;
}

@Injectable({
  providedIn: 'root'
})
export class CorsiService {

  constructor() { }
}
