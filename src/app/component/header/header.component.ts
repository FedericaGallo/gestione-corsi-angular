import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn = signal<boolean>(false);
  logButton = signal<string>('');
  entity: string = '';
  currentRoute: string = '';
  currentEntity = signal<string>('');
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((res) => {
      console.log(res);
      this.isLoggedIn.set(res);
      if (this.isLoggedIn() == true) {
        this.logButton.set('logOut');
      } else {
        this.logButton.set('logIn');
      }
    });
    /* this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      if (this.currentRoute.includes('docenti')) {
        this.entity = 'docente';
      } else if (this.currentRoute.includes('allievi')) {
        this.entity = 'allievo';
      } else if (this.currentRoute.includes('corsi')) {
        this.entity = 'corso';
      }
    }); */
  }
  onSelectedEntity(entity: string) {
    this.currentEntity.set(entity);
    console.log(this.currentEntity());
  }
  logOut() {
    this.currentEntity.set('');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('ruolo');
    this.router.navigate(['/login']);
    this.authService.logOut();
  }
  register() {
    this.currentEntity.set('');
    this.router.navigate(['/register']);
  }
  home() {
    this.currentEntity.set('');
    this.router.navigate(['']);
  }
}
