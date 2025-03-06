import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
entity: string = '';
currentRoute: string = '';
constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}
ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      if (this.currentRoute.includes('docenti')) {
            this.entity = 'docente';
          } else if (this.currentRoute.includes('allievi')) {
            this.entity = 'allievo';
          } else if (this.currentRoute.includes('corsi')) {
            this.entity = 'corso';
          }
    });
}
logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("ruolo");
    this.router.navigate(["/login"]);
    this.authService.logOut();
  }
}
