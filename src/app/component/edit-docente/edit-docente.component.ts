import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  docente: any;
}

@Component({
  selector: 'app-edit-docente',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-docente.component.html',
  styleUrl: './edit-docente.component.css',
})
export class EditDocenteComponent {
  readonly dialogRef = inject(MatDialogRef<EditDocenteComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  form = new FormGroup({
    nome: new FormControl(this.data.docente.nome, {
      validators: [Validators.required],
    }),
    cognome: new FormControl(this.data.docente.cognome, {
      validators: [Validators.required],
    }),
    descrizione: new FormControl(this.data.docente.descrizione, {
      validators: [Validators.minLength(6)],
    }),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      console.log('Form Submitted!', this.form.value);
    }
  }
}
