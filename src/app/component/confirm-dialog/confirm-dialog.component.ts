import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocentiService } from '../../service/docenti.service';
import {MatButtonModule} from '@angular/material/button';

export interface DialogData {
  docente: any;
}
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

constructor(private docentiService: DocentiService) {}
readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
readonly data = inject<DialogData>(MAT_DIALOG_DATA);
onNoClick(): void {
    this.dialogRef.close();
  }

}
