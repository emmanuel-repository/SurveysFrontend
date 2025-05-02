import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { JwtService } from 'core/services/jwt.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(JwtService);
  const router = inject(Router);

  // Verificar token expirado antes de hacer la petición
  if (authService.isTokenExpired()) {
    handleUnauthorized(authService, router);
    return next(req);
  }

  // Clonar la petición y agregar el token
  const token = authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        handleUnauthorized(authService, router);
      }
      return throwError(() => error);
    })
  );
};

function handleUnauthorized(authService: JwtService, router: Router): void {
  authService.removeToken();
  router.navigate(['']);
}
