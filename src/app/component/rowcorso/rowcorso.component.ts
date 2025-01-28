import { Component, Input } from '@angular/core';

interface Corso {
  nomeCorso: string;
  dataInizio: string;
  durata: string;
}

@Component({
  selector: 'app-rowcorso',
  standalone: true,
  imports: [],
  templateUrl: './rowcorso.component.html',
  styleUrl: './rowcorso.component.css'
})
export class RowcorsoComponent {
@Input() nomeCorso?: string;
@Input() dataInizio?: string;
@Input() durata?: string;
}
