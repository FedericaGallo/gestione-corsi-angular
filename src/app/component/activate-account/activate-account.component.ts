import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CodeInputModule } from 'angular-code-input';
import {skipUntil} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [CodeInputModule, CommonModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent {
message: string = '';
isOkay:boolean = true;
submitted:boolean = false;

constructor(
  private router: Router,
  private authService: AuthService){}
private confirmAccount(token: string) {
    this.authService.activate(
      token
    ).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated. Now you can proceed to login';
        this.submitted = true;
      },
      error: () => {
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  protected readonly skipUntil = skipUntil;
}
