import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { DocentiComponent } from './component/docenti/docenti.component';
import { DocenteComponent } from './component/docente/docente.component';
import { DocentiTableComponent } from './component/docenti-table/docenti-table.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ActivateAccountComponent } from './component/activate-account/activate-account.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'docenti',
      component: DocentiComponent,
      children: [
        {
           path: '',
           redirectTo: '',
           pathMatch: 'prefix'
        }
        ]
      },
  {path: 'docenti/table', component: DocentiTableComponent},
  {path: 'docenti/:id',
     component: DocenteComponent,
     children: [
       {
         path: '',
         redirectTo: 'edit',
         pathMatch: 'prefix'
       }
       ]
     },
   {path: 'login', component: LoginComponent},
   {path: 'register', component: RegisterComponent},
   {path: 'validation', component: ActivateAccountComponent},
   {
     path: '**',
     component: DocentiComponent,
   }
  ];
