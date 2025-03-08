import { Component, DestroyRef, signal, computed } from '@angular/core';
import { DiscentiService, Discente } from '../../service/discenti.service';
import { Corso } from '../../service/corsi.service';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddDiscenteComponent } from '../add-discente/add-discente.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditDiscenteComponent } from '../edit-discente/edit-discente.component';
//import { ViewDiscenteComponent } from '../view-discente/view-discente.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-discenti-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, RouterLink, MatButtonModule],
  templateUrl: './discenti-table.component.html',
  styleUrl: './discenti-table.component.css',
})
export class DiscentiTableComponent {
  url: string = 'http://localhost:8080/discente/';
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
  discenti = signal<Discente[]>([]);
  error = signal('');
  constructor(
    private discentiService: DiscentiService,
    private destroyRef: DestroyRef,
    public dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.isFetching.set(true);
    this.loadDiscenti(0);
  }

  loadDiscenti(page: number) {
    const subscription = this.discentiService.fetchDiscenti(page).subscribe({
      next: (response: any) => {
        console.log(response);
        this.totalElements.set(response.body.totalElements);
        this.discenti.set(response.body.content);
        this.pageNum.set(response.body.pageable.pageNumber);
        this.totalPages.set(response.body.totalPages);
        this.numberOfElements.set(response.body.numberOfElements);
        console.log(this.discenti);
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

  openDialogAdd() {
    const dialogRef = this.dialog.open(AddDiscenteComponent, {
      width: '60vw',
      height: '55vh',
    });
    console.log('today is done');
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(result);
        result.dataDiNascita = result.dataDiNascita
          .toLocaleDateString('it-IT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .split('/')
          .reverse()
          .join('-');
        this.discentiService
          .postDiscente('http://localhost:8080/discente/addDiscente', result)
          .subscribe(() => {
            this.loadDiscenti(this.pageNum());
          });
      }
    });
  }

  openDialogDelete(discente: Discente) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: '200px',
      data: { entity: discente },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        console.log(result);
        const subscription = this.discentiService.deleteDiscente(discente.id).subscribe(() => {
          this.loadDiscenti(this.pageNum());
        });
      }
    });
  }

  openDialogEdit(discente: Discente) {
    const dialogRef = this.dialog.open(EditDiscenteComponent, {
      width: '60vw',
      height: '55vh',
      data: { discente: discente },
    });
    console.log('ciao');
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(result);
        const subscription = this.discentiService
          .updateDiscente(discente.id, result)
          .subscribe(() => {
            this.loadDiscenti(this.pageNum());
          });
      }
    });
  }

  openDialogView(discente: Discente) {
    /*  const dialogRef = this.dialog.open(ViewDiscenteComponent, {
      width: '60vw',
      height: '55vh',
      data: { discente: discente },
    }); */
  }

  changePage(direction: number) {
    if (
      (this.pageNum() == 0 && direction == -1) ||
      (this.pageNum() == this.totalPages() - 1 && direction == 1)
    ) {
      return;
    }
    this.loadDiscenti(this.pageNum() + direction);
  }

  calculateStyle() {
    return { width: this.authService.isAdmin() ? '10%' : '5%' };
  }

  calculateStyleColor(corsiSeguiti: Corso[]) {
    return { color: corsiSeguiti.length > 0 ? 'green' : '#212529' };
  }
}
