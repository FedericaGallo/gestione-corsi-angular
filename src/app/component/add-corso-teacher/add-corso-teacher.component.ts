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
  selector: 'app-add-corso-teacher',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './add-corso-teacher.component.html',
  styleUrl: './add-corso-teacher.component.css'
})
export class AddCorsoTeacherComponent {
 readonly dialogRef = inject(MatDialogRef<AddCorsoTeacherComponent>);
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
