import { Component, inject, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-add-corso',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './add-corso.component.html',
  styleUrl: './add-corso.component.css'
})
export class AddCorsoComponent {
  readonly dialogRef = inject(MatDialogRef<AddCorsoComponent>);
  form = new FormGroup({
  nomeCorso: new FormControl('', {
    validators: [ Validators.required ]
    }),
  dataInizio: new FormControl('', {
    validators: [ Validators.required ]
    }),
  dataFine: new FormControl('', {
    validators: [ Validators.required ]
     })
  })

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
