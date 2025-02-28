import { Component, input, DestroyRef } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DocentiService, DocenteCorsi, Corso } from '../../service/docenti.service';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCorsoComponent } from '../add-corso/add-corso.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EditCorsoComponent } from '../edit-corso/edit-corso.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, MatDialogModule, MatIconModule],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent {
id = input.required<number>();
url: string = 'http://localhost:8080/docente/getDocenteById/';
docente = signal<DocenteCorsi | null | undefined>(undefined);
isFetching = signal(false);
constructor(private docentiService: DocentiService, private destroyRef: DestroyRef, public dialog: MatDialog){}
ngOnInit(){
  this.url = this.url + this.id!();
  this.docentiService.getDocente(this.url);
  this.docentiService.docente$.subscribe((docenteAggiornato)=>{
    this.docente.set(docenteAggiornato)
    });
//this.aggiornaDocente();
  }
 openDialogAdd(){
 const dialogRef = this.dialog.open(AddCorsoComponent, {
     width: '60vw',
     height: '55vh',
     });
    dialogRef.afterClosed().subscribe(result => {
         if (result !== undefined) {
           result.dataInizio =  result.dataInizio.toLocaleDateString('it-IT', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit'
                                                  }).split('/').reverse().join('-');
             result.dataFine =  result.dataFine.toLocaleDateString('it-IT', {
                                                                year: 'numeric',
                                                                month: '2-digit',
                                                                day: '2-digit'
                                                              }).split('/').reverse().join('-');
           console.log(result);
           result.idDocenteDTO = this.id();
          this.docentiService.postCorso('http://localhost:8080/corso/addCorso', result);
         }
       });
  }
openDialogDelete(corso : any){
   const dialogRef =  this.dialog.open(ConfirmDialogComponent, {
         width: '350px',
         height: '200px',
         data: {entity: corso}
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
                console.log(result);
               const subscription = this.docentiService.deleteDocente(result).subscribe();

               }
             });
  }
openDialogEdit(corso : any){
   const dialogRef =  this.dialog.open(EditCorsoComponent, {
        width: '60vw',
        height: '55vh',
        data: {corso: corso}
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
                console.log(result);
               }
             });
  }
openDialogView(corso : any){
   const dialogRef =  this.dialog.open(ConfirmDialogComponent, {
        width: '60vw',
        height: '55vh',
        data: {corso: corso}
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
                console.log(result);


               }
             });
  }
/* aggiornaDocente(){
  this.url = this.url + this.id!();
   console.log(this.url);
   const subscription = this.docentiService.fetchDocente(this.url).subscribe({
     next: (response) => {
       this.docente.set(response.body);
       }, complete: ()=>{
         this.isFetching.set(false);
         }
     })
  } */
}
