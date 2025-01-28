import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-formdocente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formdocente.component.html',
  styleUrl: './formdocente.component.css'
})
export class FormdocenteComponent {
  nome: string = '';
  cognome: string = '';
onSubmit(formData: NgForm) {
  if(formData.form.invalid){
    return;}
  const enteredName = formData.form.value.nome;
  console.log(enteredName);
  formData.form.reset();
  }
}
