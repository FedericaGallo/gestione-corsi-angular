import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface DialogData {
  discente: any;
  corso: any;
}
@Component({
  selector: 'app-confirm-unsubscribe-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './confirm-unsubscribe-dialog.component.html',
  styleUrl: './confirm-unsubscribe-dialog.component.css',
})
export class ConfirmUnsubscribeDialogComponent {
  constructor() {}
  readonly dialogRef = inject(MatDialogRef<ConfirmUnsubscribeDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  onNoClick(): void {
    this.dialogRef.close();
  }
}
