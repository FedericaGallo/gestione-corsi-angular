import { Component, Input } from '@angular/core';
import { Docente } from '../../service/docenti.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dettagli',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dettagli.component.html',
  styleUrl: './dettagli.component.css',
})
export class DettagliComponent {
  //@Input({required: true}) selectedDocente! : Docente; con il punto esclamativo assicuriamo che non c'è valore undefinied, con oggetto di configurazione diciamo che l'attributo è sempre richiesto
  @Input() selectedDocente?: Docente;
  //il punto interrogativo dice a ts che potrebbe esserci undefined
  //@Input() selectedDocente | undefined;
  /*@Input() user: {
  id: string;
  name: string;
  };*/
}
