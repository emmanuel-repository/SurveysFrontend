import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from 'core/services/jwt.service';

export const authUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(JwtService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.isUser()) {
    return true;
  }

  // Redirigir a login o a una página de no autorizado
  router.navigate(['/unauthorized']);
  return false;
};
