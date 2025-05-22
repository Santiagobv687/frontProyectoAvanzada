// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: any = null;

  constructor() {
    // Al cargar el servicio, intenta recuperar el usuario del localStorage
    const datos = localStorage.getItem('usuario');
    this.usuario = datos ? JSON.parse(datos) : null;
  }

  // Guardar usuario en memoria y localStorage
  login(usuario: any) {
    this.usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  // Obtener el usuario
  getUsuario() {
    return this.usuario;
  }

  // Eliminar sesión
  logout() {
    this.usuario = null;
    localStorage.removeItem('usuario');
  }

  // Saber si hay sesión activa
  isLoggedIn(): boolean {
    return this.usuario !== null;
  }
}
