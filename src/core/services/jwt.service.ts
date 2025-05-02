import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {


  private storageService = inject(BrowserStorageService);
  private router = inject(Router);
  private tokenKey = 'token';

   // Guardar token en localStorage
   setToken(token: string): void {
    this.storageService.set(this.tokenKey, token);
  }

  // Obtener token
  getToken(): string | null {
    return this.storageService.get(this.tokenKey);
  }

  // Eliminar token (logout)
  removeToken(): void {
    this.storageService.remove(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // Verificar si el token está expirado
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  // Obtener el rol del usuario desde el token
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      console.log(decoded.RoleUser)
      return decoded.RoleUser; // Asume que el token JWT tiene un campo 'role'
    } catch (error) {
      return null;
    }
  }

  // Verificar si el usuario es admin
  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  // Verificar si el usuario es user
  isUser(): boolean {
    return this.getUserRole() === 'USER';
  }

}
