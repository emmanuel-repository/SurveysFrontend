export interface User {
  id: number;
  name: string;
  last_name: string; // Cambiado a camelCase para seguir convenciones TypeScript/JavaScript
  user_rol: string;  // CamelCase
  user_name: string;  // CamelCase
  password?: string;
}

// Enums para roles de usuario (si tienes valores específicos)
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
  // Agrega otros roles según necesites
}
