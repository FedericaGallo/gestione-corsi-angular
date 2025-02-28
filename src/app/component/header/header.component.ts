import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';

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
constructor(private route: ActivatedRoute, private router: Router) {}
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
  console.log('ciao');
    console.log(localStorage.getItem('token'));
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    console.log(localStorage.getItem('token'));
  }
}
