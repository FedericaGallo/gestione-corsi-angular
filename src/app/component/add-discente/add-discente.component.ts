import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-discente',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './add-discente.component.html',
  styleUrl: './add-discente.component.css',
})
export class AddDiscenteComponent {
  form = new FormGroup({
    nome: new FormControl('', {
      validators: [Validators.required],
    }),
    cognome: new FormControl('', {
      validators: [Validators.required],
    }),
    matricola: new FormControl('', {
      validators: [Validators.required],
    }),
    dataDiNascita: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  readonly dialogRef = inject(MatDialogRef<AddDiscenteComponent>);

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
