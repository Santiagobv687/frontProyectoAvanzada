import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../servicios/users.service';
import { NgIf, NgClass } from '@angular/common';

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

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.usersService.login(credentials).subscribe({
      next: () => {
        this.result = 'Inicio de sesión exitoso';
        this.classResult = 'success';
        // Aquí puedes redirigir o guardar tokens, etc.
      },
      error: (error) => {
        this.result = error.error.message || 'Error al iniciar sesión';
        this.classResult = 'error';
      }
    });
  }
}
