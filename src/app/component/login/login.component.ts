import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

   errorMsg: Array<string> = [];
   hide = signal(true);
    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }
form = new FormGroup({
  email: new FormControl('', {
    validators: [ Validators.required, Validators.email ]
    }),
  password: new FormControl('', {
    validators: [ Validators.required, Validators.minLength(8)]
    }),
  })
constructor(
  private router: Router,
  private authService : AuthService,
  private tokenService: TokenService) {}
 register() {
    this.router.navigate(['register']);
  }

login(){
  if (this.form.valid) {
    this.authService.authenticate(this.form.value).subscribe({
      next: (res)=>{
        console.log(res);
        this.tokenService.ruolo = res.ruoli as string;
        this.tokenService.token = res.token as string;
        this.tokenService.expirationDate = res.expirationDate as string;
        console.log("isAdmin " + this.authService.isAdmin()) ;
        this.authService.logIn(res.token);
        this.router.navigateByUrl('/');
        },
      error: (err)=> {
        console.log(err);
        if (err.error.validationErrors) {
             this.errorMsg = err.error.validationErrors;
        } else {
         this.errorMsg.push(err.error.error);
         }
       }
    })
  }

}
}
