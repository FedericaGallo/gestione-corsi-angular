import { Routes, CanMatchFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { HomeComponent } from './component/home/home.component';
import { DocentiComponent } from './component/docenti/docenti.component';
import { DocenteComponent } from './component/docente/docente.component';
import { CorsoComponent } from './component/corso/corso.component';
import { DiscenteComponent } from './component/discente/discente.component';
import { DocentiTableComponent } from './component/docenti-table/docenti-table.component';
import { CorsiTableComponent } from './component/corsi-table/corsi-table.component';
import { DiscentiTableComponent } from './component/discenti-table/discenti-table.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ActivateAccountComponent } from './component/activate-account/activate-account.component';
import { authGuard } from './service/auth.guard';

/* const CanMatchLogin: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authenticated = localStorage.getItem("token");
  if (authenticated){
    return true;
    console.log("funge la guard");
    }
     return  router.parseUrl('login');
     console.log("non funge la guard");
  }; */
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'docenti/table', component: DocentiTableComponent, canActivate: [authGuard] },
  {
    path: 'docenti/:id',
    component: DocenteComponent,
  },
  { path: 'corsi/table', component: CorsiTableComponent, canActivate: [authGuard] },
  {
    path: 'corsi/:id',
    component: CorsoComponent,
  },
  { path: 'discenti/table', component: DiscentiTableComponent, canActivate: [authGuard] },
  {
    path: 'discenti/:id',
    component: DiscenteComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'validation', component: ActivateAccountComponent },
  {
    path: '**',
    component: DocentiComponent,
  },
  {
    path: 'docenti',
    component: DocentiComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'prefix',
      },
    ],
  },
];
