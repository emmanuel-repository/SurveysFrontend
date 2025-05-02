import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from 'core/services/jwt.service';


export const authAdminGuard: CanActivateFn = (route, state) => {

  const authService = inject(JwtService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.isAdmin()) {
    return true;
  }
  // Redirigir a login si no está autenticado
  router.navigate(['/']);

  return false;

};
