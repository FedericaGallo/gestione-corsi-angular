import { Component, DestroyRef, signal, computed } from '@angular/core';
import { CorsiService, Corso } from '../../service/corsi.service';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddDocenteComponent } from '../add-docente/add-docente.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditDocenteComponent } from '../edit-docente/edit-docente.component';
import { ViewDocenteComponent } from '../view-docente/view-docente.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-corsi-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule, RouterLink],
  templateUrl: './corsi-table.component.html',
  styleUrl: './corsi-table.component.css'
})
export class CorsiTableComponent {
isFetching = signal(false);
   pageNum = signal<number>(0);
   numberOfElements = signal<number>(0);
    totalPages = signal<number>(0);
    totalElements = signal<number>(0);
    lastElement = computed(() => {
    if(this.pageNum()+1 == this.totalPages()){
      return this.totalElements();
      } else {
       return (this.pageNum() + 1) * 10;
        }
    });
    firstElement = computed(() => (this.lastElement() - this.numberOfElements())+1 );
    corsi = signal<Corso[]>([]);
     error = signal('');
     newCorso = signal<any>({});
       constructor(
         private corsiService: CorsiService,
         private destroyRef: DestroyRef,
         public dialog: MatDialog,
         public authService: AuthService){}
      ngOnInit(){
        this.isFetching.set(true);
        this.loadCorsi(0);
        }
      loadCorsi(page: number){
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
      /*   openDialogAdd(){
         const dialogRef = this.dialog.open(AddDocenteComponent, {
             width: '60vw',
             height: '55vh',
             });
            dialogRef.afterClosed().subscribe(result => {
                 if (result !== undefined) {
                   console.log(result);
                  this.corsiService.postCorso('http://localhost:8080/docente/addDocente', result).subscribe(()=>{
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
          } */
        changePage(direction: number){
         if(this.pageNum() == 0 && direction == -1 || this.pageNum() == this.totalPages() - 1 && direction == 1){
            return;
            }
            this.loadCorsi(this.pageNum() + direction);
          }

        calculateStyle(){
         return {'width': this.authService.isAdmin()? '10%': '5%'};

          }
}
