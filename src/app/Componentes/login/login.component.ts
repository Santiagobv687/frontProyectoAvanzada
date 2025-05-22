import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../servicios/users.service';
import { NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import {AuthService} from '../../servicios/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  result = '';
  classResult = 'success';

  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private router: Router,
              private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.usersService.login(credentials).subscribe({
      next: (response) => {
        console.log('Respuesta completa del backend:', response);

        // Primero guarda el token
        if (response.token) {
          localStorage.setItem('token', response.token);
        }

        // Verifica la estructura de la respuesta
        console.log('Usuario:', response.usuario);
        console.log('Rol del usuario:', response.usuario?.rol);


        this.result = 'Inicio de sesión exitoso';
        this.classResult = 'success';
        const usuario = response.usuario;
        this.authService.login(usuario);
        // Validación del rol con verificaciones adicionales
        if (response.usuario && response.usuario.rol) {
          const rol = response.usuario.rol;

          if (rol === 'ADMIN') {
            this.router.navigateByUrl('/admin', { replaceUrl: true });
          } else if (rol === 'USER') {
            this.router.navigateByUrl('/usuario', { replaceUrl: true });
          }
        } else {
          // Si no hay información de rol, manejar el caso
          console.warn('No se encontró información de rol en la respuesta');
        }
      },
      error: (error) => {
        console.error('Error completo:', error);
        this.result = error.error?.message || 'Error al iniciar sesión';
        this.classResult = 'error';
      }
    });
  }
}
