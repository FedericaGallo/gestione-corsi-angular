import { Component, input, DestroyRef } from '@angular/core';
import { DiscentiService, Discente } from '../../service/discenti.service';
import { Corso } from '../../service/corsi.service';
import { signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmUnsubscribeDialogComponent } from '../confirm-unsubscribe-dialog/confirm-unsubscribe-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { EditDiscenteComponent } from '../edit-discente/edit-discente.component';
import { SubscribeDiscenteComponent } from '../subscribe-discente/subscribe-discente.component';

@Component({
  selector: 'app-discente',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, CommonModule, MatButtonModule],
  templateUrl: './discente.component.html',
  styleUrl: './discente.component.css',
})
export class DiscenteComponent {
  id = input.required<number>();
  url: string = 'http://localhost:8080/discente/getDiscenteById/';
  discente = signal<Discente | null | undefined>(undefined);
  corsiNonSeguiti = signal<Corso[]>([]);
  isFetching = signal(false);
  constructor(
    private discentiService: DiscentiService,
    private destroyRef: DestroyRef,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.url = this.url + this.id!();
    this.discentiService.getDiscente(this.url);
    this.discentiService.discente$.subscribe((discenteAggiornato) => {
      this.discente.set(discenteAggiornato);
    });
  }

  openDialogUnsubscribe(corso: any) {
    const dialogRef = this.dialog.open(ConfirmUnsubscribeDialogComponent, {
      width: '400px',
      height: '300px',
      data: { corso: corso, discente: this.discente() },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        console.log(result);
        const subscription = this.discentiService.unsubscribe(corso.id, this.id()).subscribe(() => {
          this.discentiService.getDiscente(this.url);
        });
      }
    });
  }
  openDialogEdit() {
    const dialogRef = this.dialog.open(EditDiscenteComponent, {
      width: '60vw',
      height: '55vh',
      data: { discente: this.discente() },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(result);
        const subscription = this.discentiService
          .updateDiscente(this.discente()!.id, result)
          .subscribe();
      }
    });
  }
  openDialogSubscribe() {
    this.discentiService.getCorsiNonSeguiti(this.id()).subscribe((response) => {
      this.corsiNonSeguiti.set(response);
    });
    const dialogRef = this.dialog.open(SubscribeDiscenteComponent, {
      width: '60vw',
      height: '55vh',
      data: { corsi: this.corsiNonSeguiti() },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(result);
        const subscription = this.discentiService
          .iscriviDiscente(this.discente()!.id, result)
          .subscribe();
      }
    });
  }
}
