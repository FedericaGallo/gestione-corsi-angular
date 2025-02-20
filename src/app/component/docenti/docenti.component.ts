import { Component, DestroyRef } from '@angular/core';
import { DocentiService, Docente } from '../../service/docenti.service';
import { CommonModule, Location } from '@angular/common';
//import { MatcardComponent } from '../matcard/matcard.component';
//import { MatCardModule } from '@angular/material/card';
import { DettagliComponent } from '../dettagli/dettagli.component';
import { CardComponent } from '../card/card.component';
import { signal } from '@angular/core';
import { throwError } from 'rxjs';
import { MatIconModule } from '@angular/material/icon'
import { RouterOutlet, RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-docenti',
  standalone: true,
  imports: [CommonModule, DettagliComponent, CardComponent, MatIconModule, RouterOutlet, RouterLink],
  templateUrl: './docenti.component.html',
  styleUrl: './docenti.component.css'
})
export class DocentiComponent {
  pageNum = signal<number>(0);
  totalPages = signal<number>(0);
  docenti = signal<Docente[] | null | undefined>(undefined);
  selectedDocente: number = 0;
  selectedDocenteObject!: Docente | undefined;
  isFetching = signal(false);
  error = signal('');
  //selectedDocenteOb: Docente;
  //grazie al costruttore avviene l'iniezione delle dipendenze
constructor(private docentiService: DocentiService, private destroyRef: DestroyRef, private route: ActivatedRoute, private router: Router, private location: Location) { }
// private docentiService = inject(DocentiService); in alternariva si puo usare questa sintassi per l'iniezione delle dipendenze

ngOnInit(){
  this.isFetching.set(true);
  this.loadDocenti(0);
  console.log(this.route.snapshot);
  this.router.events.subscribe(() => {
       console.log(this.router.url);
        });
  }
onSelectedDocente(id: number){
  this.selectedDocente = id;
  const docentiArray = this.docenti();
  /*  this.router.events.subscribe(() => {
     const currentRoute = this.router.url;
        if (currentRoute) {
              //this.location.back();
              console.log('ciao');
             this.router.navigate(['docenti']);
            }
      }); */
  const url:any = this.route.snapshot.url;
  console.log(url);
  if (url.includes('add')){
     console.log('ciao');
    this.location.back();
    //this.router.navigate(['docenti']);
    }
  if(docentiArray){
  this.selectedDocenteObject = docentiArray.find((docente)=> docente.id === id);
 //console.log(this.selectedDocenteObject);
  }
}
changePage(direction: number){
 if(this.pageNum() == 0 && direction == -1 || this.pageNum() == this.totalPages() - 1 && direction == 1){
    return;
    }
    this.loadDocenti(this.pageNum() + direction);
  }

loadDocenti(page: number){
  const subscription = this.docentiService.fetchDocenti(page).subscribe({
      next: (response: any) => {
              //console.log(response.body);
              //console.log(response.status);
              console.log(response.body);
              this.docenti.set(response.body.content);
              this.pageNum.set(response.body.pageable.pageNumber);
              this.totalPages.set(response.body.totalPages);
              console.log(response.body);
              console.log(this.pageNum());
              console.log(this.totalPages());
              },
            error: (error: any)=> {
              this.error.set(error.message);
              },
            complete: ()=>{
              this.isFetching.set(false);
              }
      });
  this.destroyRef.onDestroy(() => {
    subscription.unsubscribe();
    })
  }
}
