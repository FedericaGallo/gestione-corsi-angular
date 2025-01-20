import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Docente } from '../../service/docenti.service';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-matcard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './matcard.component.html',
  styleUrl: './matcard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatcardComponent {
 @Input({required: true}) docente!: Docente;
 @Output() select = new EventEmitter<number>();

 onSelect(){
   this.select.emit(this.docente.id);
   console.log("ciao");
   }

}
