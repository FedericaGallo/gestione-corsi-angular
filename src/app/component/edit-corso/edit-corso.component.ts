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
  corso: any;
  docenti: any;
}
@Component({
  selector: 'app-edit-corso',
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
  templateUrl: './edit-corso.component.html',
  styleUrl: './edit-corso.component.css',
})
export class EditCorsoComponent {
  readonly dialogRef = inject(MatDialogRef<EditCorsoComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  form = new FormGroup({
    nomeCorso: new FormControl(this.data.corso.nomeCorso, {
      validators: [Validators.required],
    }),
    dataInizio: new FormControl(this.data.corso.dataInizio, {
      validators: [Validators.required],
    }),
    dataFine: new FormControl(this.data.corso.dataFine, {
      validators: [Validators.required],
    }),
    idDocenteDTO: new FormControl('', {
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
