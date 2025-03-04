import { Component, DestroyRef } from '@angular/core';
import { DocentiService, Docente } from '../../service/docenti.service';
import { signal } from '@angular/core';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddDocenteComponent } from '../add-docente/add-docente.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditDocenteComponent } from '../edit-docente/edit-docente.component';
import { ViewDocenteComponent } from '../view-docente/view-docente.component';
import { RouterLink } from '@angular/router';
import {AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-docenti-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, RouterLink],
  templateUrl: './docenti-table.component.html',
  styleUrl: './docenti-table.component.css'
})
export class DocentiTableComponent {
  url: string= 'http://localhost:8080/docente/';
  isFetching = signal(false);
   pageNum = signal<number>(0);
    totalPages = signal<number>(0);
    docenti = signal<Docente[]>([]);
     error = signal('');
     newDocente = signal<any>({});
  constructor(
    private docentiService: DocentiService,
    private destroyRef: DestroyRef,
    public dialog: MatDialog,
    public authService: AuthService){}
  ngOnInit(){
    this.isFetching.set(true);
    this.loadDocenti(0);
    }
  loadDocenti(page: number){
    const subscription = this.docentiService.fetchDocenti(page).subscribe({
        next: (response: any) => {
                this.docenti.set(response.body.content);
                this.pageNum.set(response.body.pageable.pageNumber);
                this.totalPages.set(response.body.totalPages);
                console.log(this.docenti);
                },
              error: (error: any)=> {
                this.error.set(error.message);
                console.log(error);
                },
              complete: ()=>{
                this.isFetching.set(false);
                }
        });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
      })
    }
openDialogAdd(){
 const dialogRef = this.dialog.open(AddDocenteComponent, {
     width: '60vw',
     height: '55vh',
     });
    dialogRef.afterClosed().subscribe(result => {
         if (result !== undefined) {
           console.log(result);
          this.docentiService.postDocente('http://localhost:8080/docente/addDocente', result).subscribe(()=>{
            this.loadDocenti(this.pageNum());
            });
         }
       });
  }
openDialogDelete(docente : Docente){
   const dialogRef =  this.dialog.open(ConfirmDialogComponent, {
         width: '350px',
         height: '200px',
         data: {entity: docente}
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
                console.log(result);
               const subscription = this.docentiService.deleteDocente(result).subscribe(()=>{
                this.loadDocenti(this.pageNum());
                 });

               }
             });
  }
openDialogEdit(docente : Docente){
   const dialogRef =  this.dialog.open(EditDocenteComponent, {
        width: '60vw',
        height: '55vh',
        data: {docente: docente}
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
                console.log(result);
               const subscription = this.docentiService.updateDocente(docente.id, result).subscribe(()=>{
                this.loadDocenti(this.pageNum());
                 });

               }
             });
  }
openDialogView(docente : Docente){
   const dialogRef =  this.dialog.open(ViewDocenteComponent, {
        width: '60vw',
        height: '55vh',
        data: {docente: docente}
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
                console.log(result);
               const subscription = this.docentiService.updateDocente(docente.id, result).subscribe(()=>{
                this.loadDocenti(this.pageNum());
                 });

               }
             });
  }
changePage(direction: number){
 if(this.pageNum() == 0 && direction == -1 || this.pageNum() == this.totalPages() - 1 && direction == 1){
    return;
    }
    this.loadDocenti(this.pageNum() + direction);
  }
}
