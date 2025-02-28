import { Component, signal} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
errorMessage = signal('');
   hide = signal(true);
    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }
form = new FormGroup({
   nome: new FormControl('', {
      validators: [ Validators.required ]
      }),
   cognome: new FormControl('', {
      validators: [ Validators.required ]
      }),
  email: new FormControl('', {
    validators: [ Validators.required, Validators.email ]
    }),
  password: new FormControl('', {
    validators: [ Validators.required, Validators.min(8)]
    }),
  })

constructor(
  private router: Router,
  private authService : AuthService,
  private tokenService: TokenService) {}

  register() {
      if (this.form.valid) {
         this.authService.register(this.form.value).subscribe({
           next: ()=>{
             this.router.navigate(['login']); },
           error: (err)=> {
             console.log(err);}
         })
       }
    }
  validate(){
    this.router.navigate(['validation']);
    }
}
