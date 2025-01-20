import { Component } from '@angular/core';
import { DocentiService, Docente } from '../../service/docenti.service';
import { CommonModule } from '@angular/common';
import { MatcardComponent } from '../matcard/matcard.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-docenti',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatcardComponent],
  templateUrl: './docenti.component.html',
  styleUrl: './docenti.component.css'
})
export class DocentiComponent {
  docenti: Docente[] = [];
  selectedDocente: number = 0;
constructor(private docentiService: DocentiService) { }

ngOnInit(){
  this.docenti = this.docentiService.getDocenti();
  console.log(this.docenti);
  }
onSelectD(id: number){
  this.selectedDocente = id;
  console.log(this.selectedDocente + " " +id);
  console.log(this.getSelectedDocente());}

getSelectedDocente(){
  return this.docenti.find((docente)=> docente.id === this.selectedDocente);
  }
}
