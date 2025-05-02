export interface User {
  id: number;
  name: string;
  lastName: string; // Cambiado a camelCase para seguir convenciones TypeScript/JavaScript
  userRol: string;  // CamelCase
  userName: string;  // CamelCase
  password?: string;
}

// Enums para roles de usuario (si tienes valores específicos)
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
  // Agrega otros roles según necesites
}
