import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
export interface DialogData {
  docente: any;
}
@Component({
  selector: 'app-view-docente',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './view-docente.component.html',
  styleUrl: './view-docente.component.css',
})
export class ViewDocenteComponent {
  readonly dialogRef = inject(MatDialogRef<ViewDocenteComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
}
