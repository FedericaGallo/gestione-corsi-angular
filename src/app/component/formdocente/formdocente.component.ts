import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formdocente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formdocente.component.html',
  styleUrl: './formdocente.component.css'
})
export class FormdocenteComponent {
  nome: string = '';
  cognome: string = '';
onSubmit() {
  console.log('SUBMITTED');
  }
}
