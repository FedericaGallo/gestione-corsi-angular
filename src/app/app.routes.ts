import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import {DocentiComponent} from './component/docenti/docenti.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'docenti', component: DocentiComponent}
  ];
