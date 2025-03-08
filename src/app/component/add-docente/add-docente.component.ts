import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  nome: string;
  cognome: string;
  descrizione: string;
}

@Component({
  selector: 'app-add-docente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-docente.component.html',
  styleUrl: './add-docente.component.css',
})
export class AddDocenteComponent {
  //@ViewChild('dialog') dialog! :ElementRef<HTMLDialogElement>;
  form = new FormGroup({
    nome: new FormControl('', {
      validators: [Validators.required],
    }),
    cognome: new FormControl('', {
      validators: [Validators.required],
    }),
    descrizione: new FormControl('', {
      validators: [Validators.minLength(6)],
    }),
  });
  readonly dialogRef = inject(MatDialogRef<AddDocenteComponent>);
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
