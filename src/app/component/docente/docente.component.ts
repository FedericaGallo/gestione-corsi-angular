import { Component, input, DestroyRef } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DocentiService, DocenteCorsi } from '../../service/docenti.service';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent {
id = input.required<number>();
url: string = 'http://localhost:8080/docente';
docente = signal<DocenteCorsi | null | undefined>(undefined);
isFetching = signal(false);
constructor(private docentiService: DocentiService, private destroyRef: DestroyRef){}
ngOnInit(){
 this.url = this.url + '/getDocenteById/' + this.id!();
 console.log(this.url);
 const subscription = this.docentiService.fetchDocente(this.url).subscribe({
   next: (response) => {
     this.docente.set(response.body);

     }, complete: ()=>{
       this.isFetching.set(false);
       }
   })
  }
}
