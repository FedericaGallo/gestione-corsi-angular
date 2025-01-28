import { Component, DestroyRef } from '@angular/core';
import { DocentiService, Docente } from '../../service/docenti.service';
import { CommonModule } from '@angular/common';
//import { MatcardComponent } from '../matcard/matcard.component';
//import { MatCardModule } from '@angular/material/card';
import {DettagliComponent} from '../dettagli/dettagli.component';
import {CardComponent} from '../card/card.component';
import { signal } from '@angular/core';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-docenti',
  standalone: true,
  imports: [CommonModule, DettagliComponent, CardComponent],
  templateUrl: './docenti.component.html',
  styleUrl: './docenti.component.css'
})
export class DocentiComponent {
  docenti = signal<Docente[] | null | undefined>(undefined);
   selectedDocente: number = 0;
   selectedDocenteObject!: Docente | undefined;
   isFetching = signal(false);
   error = signal('');
  //selectedDocenteOb: Docente;
  //grazie al costruttore avviene l'iniezione delle dipendenze
constructor(private docentiService: DocentiService, private destroyRef: DestroyRef) { }
// private docentiService = inject(DocentiService); in alternariva si puo usare questa sintassi per l'iniezione delle dipendenze

ngOnInit(){
  this.isFetching.set(true);
const subscription = this.docentiService.loadDocenti().subscribe({
    next: (response) => {
            //console.log(response.body);
            //console.log(response.status);
            this.docenti.set(response.body);
            //console.log(this.docenti());
            },
          error: (error)=> {
            this.error.set(error.message);
            },
          complete: ()=>{
            this.isFetching.set(false);
            }
    });
this.destroyRef.onDestroy(() => {
  subscription.unsubscribe();
  })
  }
onSelectedDocente(id: number){
  this.selectedDocente = id;
  const docentiArray = this.docenti();
  if(docentiArray){
 this.selectedDocenteObject = docentiArray.find((docente)=> docente.id === id);
 //console.log(this.selectedDocenteObject);
  }
}
}
