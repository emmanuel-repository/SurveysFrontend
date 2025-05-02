export interface User {
  id: number;
  name: string;
  lastName: string; // Cambiado a camelCase para seguir convenciones TypeScript/JavaScript
  userRol: string;  // CamelCase
  userName: string;  // CamelCase
  password: string;
}

// Versión con valores opcionales (para creación/actualización)
export interface UserPartial {
  id?: number;
  name?: string;
  lastName?: string;
  userRol?: string;
  userName?: string;
  password?: string;
}

// Versión para creación de usuario (sin id)
export interface CreateUserDto {
  name: string;
  lastName: string;
  userRol: string;
  userName: string;
  password: string;
}

// Versión para actualización (todos los campos opcionales excepto id)
export interface UpdateUserDto {
  id: number;
  name?: string;
  lastName?: string;
  userRol?: string;
  userName?: string;
  password?: string;
}

// Versión para respuesta del API (podría excluir la contraseña)
export interface UserResponse {
  id: number;
  name: string;
  lastName: string;
  userRol: string;
  userName: string;
  // password no se incluye normalmente en las respuestas
}

// Enums para roles de usuario (si tienes valores específicos)
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
  // Agrega otros roles según necesites
}
