import { Component, inject, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface DialogData {
  docenti: any;
}

@Component({
  selector: 'app-add-corso',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './add-corso.component.html',
  styleUrl: './add-corso.component.css',
})
export class AddCorsoComponent {
  readonly dialogRef = inject(MatDialogRef<AddCorsoComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  form = new FormGroup({
    nomeCorso: new FormControl('', {
      validators: [Validators.required],
    }),
    dataInizio: new FormControl('', {
      validators: [Validators.required],
    }),
    dataFine: new FormControl('', {
      validators: [Validators.required],
    }),
    idDocenteDTO: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  today: Date = new Date();
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
