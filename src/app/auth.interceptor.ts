/* import { HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';


export const authInterceptor: HttpInterceptorFn = (req : HttpRequest<unknown>, next: HttpHandlerFn) => {

  const idToken = localStorage.getItem("token");

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + idToken)
      });
      console.log(cloned);
      return next(cloned);
    } else {
      console.log("no token");
      return next(req);
    }
}; */
