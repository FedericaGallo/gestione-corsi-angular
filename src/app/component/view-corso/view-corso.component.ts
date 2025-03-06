import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
export interface DialogData {
  corso: any;
}

@Component({
  selector: 'app-view-corso',
  standalone: true,
  imports: [],
  templateUrl: './view-corso.component.html',
  styleUrl: './view-corso.component.css'
})
export class ViewCorsoComponent {
readonly dialogRef = inject(MatDialogRef<ViewCorsoComponent>);
readonly data = inject<DialogData>(MAT_DIALOG_DATA);
}
