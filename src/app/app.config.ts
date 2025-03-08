import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';

function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  } else {
    return true;
  }
}
function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  var idToken;
  if (isLocalStorageAvailable()) {
    idToken = localStorage.getItem('token');
  }
  if (idToken) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + idToken),
    });
    console.log(cloned);
    return next(cloned);
  } else {
    return next(req);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
