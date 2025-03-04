import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {inject} from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
      const auth = inject(AuthService);
      const router = inject(Router);
return auth.token$.pipe(
    map(token => token ? true : router.parseUrl('/login'))
  );

};
