import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

export interface DialogData {
  discente: any;
  corsi: any;
}

@Component({
  selector: 'app-edit-discente',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './edit-discente.component.html',
  styleUrl: './edit-discente.component.css',
})
export class EditDiscenteComponent {
  readonly dialogRef = inject(MatDialogRef<EditDiscenteComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  form = new FormGroup({
    nome: new FormControl(this.data.discente.nome, {
      validators: [Validators.required],
    }),
    cognome: new FormControl(this.data.discente.cognome, {
      validators: [Validators.required],
    }),
    matricola: new FormControl(this.data.discente.matricola, {
      validators: [Validators.required],
    }),
    dataDiNascita: new FormControl(this.data.discente.dataDiNascita, {
      validators: [Validators.required],
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
