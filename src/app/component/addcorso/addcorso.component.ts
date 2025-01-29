import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm, NgModel } from '@angular/forms';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-addcorso',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './addcorso.component.html',
  styleUrl: './addcorso.component.css'
})
export class AddcorsoComponent {

id = input.required<number>();
today: string = new Date().toISOString().split('T')[0];
dataInizio = signal(this.today);

constructor(private httpClient: HttpClient){};
onSubmit(formData: NgForm, nome: NgModel, fine: NgModel, inizio: NgModel){
   if(formData.form.invalid){
      return;}
this.httpClient.post('http://localhost:8080/corso/addCorso', {
nomeCorso: nome.value,
dataInizio: inizio.value,
dataFine: fine.value,
idDocenteDTO: this.id(),
  }).subscribe({
    next:(resData)=> console.log(resData)});
      };
ngOnInit(){
  console.log(this.today);}
}
