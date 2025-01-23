import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { DocentiComponent } from './component/docenti/docenti.component';
import { FormdocenteComponent } from './component/formdocente/formdocente.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'docenti', component: DocentiComponent},
  {path: 'form', component: FormdocenteComponent},
  {path: 'docenti', component: DocentiComponent},
  ];
