import { Component, inject, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface DialogData {
  discenti: any;
}

@Component({
  selector: 'app-subscribe-to-course',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './subscribe-to-course.component.html',
  styleUrl: './subscribe-to-course.component.css',
})
export class SubscribeToCourseComponent {
  readonly dialogRef = inject(MatDialogRef<SubscribeToCourseComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  form = new FormGroup({
    discentiId: new FormControl('', {
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
