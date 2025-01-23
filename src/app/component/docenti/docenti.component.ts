import { Component } from '@angular/core';
import { DocentiService, Docente } from '../../service/docenti.service';
import { CommonModule } from '@angular/common';
//import { MatcardComponent } from '../matcard/matcard.component';
//import { MatCardModule } from '@angular/material/card';
import {DettagliComponent} from '../dettagli/dettagli.component';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'app-docenti',
  standalone: true,
  imports: [CommonModule, DettagliComponent, CardComponent],
  templateUrl: './docenti.component.html',
  styleUrl: './docenti.component.css'
})
export class DocentiComponent {
  docenti: Docente[] = [];
  selectedDocente: number = 0;
  //grazie al costruttore avviene l'iniezione delle dipendenze
constructor(private docentiService: DocentiService) { }
// private docentiService = inject(DocentiService); in alternariva si puo usare questa sintassi per l'iniezione delle dipendenze

ngOnInit(){
  this.docenti = this.docentiService.getDocenti();
  console.log(this.docenti);
  this.docentiService.getDocentir();
  this.docentiService.getDocentiT();
  }
onSelectD(id: number){
  this.selectedDocente = id;
  console.log(this.selectedDocente + " " +id);
  console.log(this.getSelectedDocente());}

getSelectedDocente(){
  return this.docenti.find((docente)=> docente.id === this.selectedDocente) || null;
  //return this.docenti.find((docente)=> docente.id === this.selectedDocente)!; possiamo anche mettere punto esclamativo
}
}
