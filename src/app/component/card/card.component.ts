import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Docente } from '../../service/docenti.service';
import { Input, Output, EventEmitter } from '@angular/core';

/* per definire un oggetto puoi scrivere così, in alternativa si usano le interface
type User = {
  id: string;
  avatar: string;
  name: string;
  }
*/
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) docente!: Docente;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter<number>();

  onSelect() {
    this.select.emit(this.docente.id);
  }
}
