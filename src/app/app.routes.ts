import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { DocentiComponent } from './component/docenti/docenti.component';
import { DocenteComponent } from './component/docente/docente.component';
import { FormdocenteComponent } from './component/formdocente/formdocente.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'docenti', component: DocentiComponent},
  {path: 'form', component: FormdocenteComponent},
  {path: 'docenti/:id',
     component: DocenteComponent,
     children: [{
       path: 'edit',
       component: FormdocenteComponent,
       },
       {
         path: 'add/corso',
       component: FormdocenteComponent,
       }

       ]
     },
  ];
