import { Component, input } from '@angular/core';

@Component({
  selector: 'app-addcorso',
  standalone: true,
  imports: [],
  templateUrl: './addcorso.component.html',
  styleUrl: './addcorso.component.css'
})
export class AddcorsoComponent {
id = input.required<number>();
}
