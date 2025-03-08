import { Component, DestroyRef, signal, computed } from '@angular/core';
import { CorsiService, Corso } from '../../service/corsi.service';
import { DocentiService, Docente } from '../../service/docenti.service';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCorsoComponent } from '../add-corso/add-corso.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditCorsoComponent } from '../edit-corso/edit-corso.component';
import { ViewCorsoComponent } from '../view-corso/view-corso.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-corsi-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule, RouterLink],
  templateUrl: './corsi-table.component.html',
  styleUrl: './corsi-table.component.css',
})
export class CorsiTableComponent {
  isFetching = signal(false);
  pageNum = signal<number>(0);
  numberOfElements = signal<number>(0);
  totalPages = signal<number>(0);
  totalElements = signal<number>(0);
  lastElement = computed(() => {
    if (this.pageNum() + 1 == this.totalPages()) {
      return this.totalElements();
    } else {
      return (this.pageNum() + 1) * 10;
    }
  });
  firstElement = computed(() => this.lastElement() - this.numberOfElements() + 1);
  corsi = signal<Corso[]>([]);
  docenti = signal<Docente[]>([]);
  error = signal('');
  newCorso = signal<any>({});
  constructor(
    private corsiService: CorsiService,
    private destroyRef: DestroyRef,
    public dialog: MatDialog,
    public authService: AuthService,
    public docentiService: DocentiService
  ) {}
  ngOnInit() {
    this.isFetching.set(true);
    this.loadCorsi(0);
    this.getDocenti();
  }
  loadCorsi(page: number) {
    const subscription = this.corsiService.fetchCorsi(page).subscribe({
      next: (response: any) => {
        console.log(response);
        this.totalElements.set(response.body.totalElements);
        this.corsi.set(response.body.content);
        this.pageNum.set(response.body.pageable.pageNumber);
        this.totalPages.set(response.body.totalPages);
        this.numberOfElements.set(response.body.numberOfElements);
        console.log(this.corsi);
      },
      error: (error: any) => {
        this.error.set(error.message);
        console.log(error);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  getDocenti() {
    const subscription = this.docentiService.getDocenti().subscribe({
      next: (res: any) => {
        this.docenti.set(res.body);
        console.log(this.docenti());
      },
      error: (error: any) => {
        this.error.set(error.message);
        console.log(error);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  openDialogAdd() {
    const dialogRef = this.dialog.open(AddCorsoComponent, {
      width: '60vw',
      height: '55vh',
      data: { docenti: this.docenti() },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        result.dataInizio = result.dataInizio
          .toLocaleDateString('it-IT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .split('/')
          .reverse()
          .join('-');
        result.dataFine = result.dataFine
          .toLocaleDateString('it-IT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .split('/')
          .reverse()
          .join('-');
        console.log(result);
        this.corsiService
          .postCorso('http://localhost:8080/corso/addCorso', result)
          .subscribe(() => {
            this.loadCorsi(this.pageNum());
          });
      }
    });
  }

  openDialogDelete(corso: Corso) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: '200px',
      data: { entity: corso },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        console.log(result);
        const subscription = this.corsiService.deleteCorso(corso.id).subscribe(() => {
          this.loadCorsi(this.pageNum());
        });
      }
    });
  }

  openDialogEdit(corso: Corso) {
    const dialogRef = this.dialog.open(EditCorsoComponent, {
      width: '60vw',
      height: '55vh',
      data: { corso: corso, docenti: this.docenti() },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(result);
        const subscription = this.corsiService.updateCorso(corso.id, result).subscribe(() => {
          this.loadCorsi(this.pageNum());
        });
      }
    });
  }
  openDialogView(corso: Corso) {
    const dialogRef = this.dialog.open(ViewCorsoComponent, {
      width: '60vw',
      height: '55vh',
      data: { corso: corso },
    });
  }
  changePage(direction: number) {
    if (
      (this.pageNum() == 0 && direction == -1) ||
      (this.pageNum() == this.totalPages() - 1 && direction == 1)
    ) {
      return;
    }
    this.loadCorsi(this.pageNum() + direction);
  }

  calculateStyle() {
    return { width: this.authService.isAdmin() ? '10%' : '5%' };
  }
}
