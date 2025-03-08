import { Component, input, DestroyRef } from '@angular/core';
import { CorsiService, Corso } from '../../service/corsi.service';
import { DiscentiService } from '../../service/discenti.service';
import { Discente } from '../../service/discenti.service';
import { signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmUnsubscribeDialogComponent } from '../confirm-unsubscribe-dialog/confirm-unsubscribe-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { EditDiscenteComponent } from '../edit-discente/edit-discente.component';
import { SubscribeToCourseComponent } from '../subscribe-to-course/subscribe-to-course.component';

@Component({
  selector: 'app-corso',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, CommonModule, MatButtonModule],
  templateUrl: './corso.component.html',
  styleUrl: './corso.component.css',
})
export class CorsoComponent {
  id = input.required<number>();
  url: string = 'http://localhost:8080/corso/getCorsoById/';
  corso = signal<Corso | null | undefined>(undefined);
  discentiNonIscritti = signal<Discente[]>([]);
  isFetching = signal(false);
  constructor(
    private discentiService: DiscentiService,
    private corsiService: CorsiService,
    private destroyRef: DestroyRef,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.url = this.url + this.id!();
    this.corsiService.getCorso(this.url);
    this.corsiService.corso$.subscribe((corsoAggiornato) => {
      this.corso.set(corsoAggiornato);
    });
  }

  openDialogUnsubscribe(discente: any) {
    const dialogRef = this.dialog.open(ConfirmUnsubscribeDialogComponent, {
      width: '400px',
      height: '300px',
      data: { discente: discente, corso: this.corso() },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        console.log(result);
        const subscription = this.discentiService
          .unsubscribe(this.id(), discente.id)
          .subscribe(() => {
            this.corsiService.getCorso(this.url);
          });
      }
    });
  }
  openDialogEdit() {
    const dialogRef = this.dialog.open(EditDiscenteComponent, {
      width: '60vw',
      height: '55vh',
      data: { corso: this.corso() },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(result);
        const subscription = this.corsiService.updateCorso(this.corso()!.id, result).subscribe();
      }
    });
  }
  openDialogSubscribe() {
    this.corsiService.getDiscentiNonIscritti(this.id()).subscribe((response) => {
      this.discentiNonIscritti.set(response);
    });
    const dialogRef = this.dialog.open(SubscribeToCourseComponent, {
      width: '60vw',
      height: '55vh',
      data: { discenti: this.discentiNonIscritti() },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(result);
        const subscription = this.corsiService
          .iscriviAlCorso(this.corso()!.id, result)
          .subscribe();
      }
    });
  }
}
