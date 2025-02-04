import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm, NgModel } from '@angular/forms';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DocenteComponent } from '../docente/docente.component';
import { DocentiService } from '../../service/docenti.service';
@Component({
  selector: 'app-addcorso',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, DocenteComponent],
  templateUrl: './addcorso.component.html',
  styleUrl: './addcorso.component.css'
})
export class AddcorsoComponent {

id = input.required<number>();
today: string = new Date().toISOString().split('T')[0];
dataInizio = signal(this.today);


constructor(private httpClient: HttpClient, private docenteComponent: DocenteComponent, private docentiService: DocentiService){};
onSubmit(formData: NgForm, nome: NgModel, fine: NgModel, inizio: NgModel){
  if (formData.form.invalid) {
      return;
    }
this.docentiService.postCorso('http://localhost:8080/corso/addCorso',
  {
    nomeCorso: nome.value,
    dataInizio: inizio.value,
    dataFine: fine.value,
    idDocenteDTO: this.id(),
 });
   /* this.httpClient.post('http://localhost:8080/corso/addCorso', {
      nomeCorso: nome.value,
      dataInizio: inizio.value,
      dataFine: fine.value,
      idDocenteDTO: this.id(),
    }).subscribe({
      next: (resData) => {
        console.log(resData);
        this.docenteComponent.aggiornaDocente();
      },
      error: (err) => {
        console.error('Errore:', err);
      }
    });*/

      };
ngOnInit(){
  console.log(this.today);}
}
