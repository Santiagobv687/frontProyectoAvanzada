import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../../servicios/users.service";
import {UserResponse} from '../../dto/user-response';

@Component({
  selector: 'app-crearReporte',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './crearReporte.component.html',
  styleUrl: './crearReporte.component.css'
})
export class CrearReporteComponent {
  title = '';
  CrearReporteform!: FormGroup;
  categorias: string[]=[];
  usuarioActual!: UserResponse;

  constructor(private formBuilder: FormBuilder,private usersService: UsersService, private router: Router) {
    this.CrearReporteform = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      categorias: this.formBuilder.array([], Validators.required),
      descripcion: ['', [Validators.required]],
      usuarioId: ['', [Validators.required]],
      imagenes: this.formBuilder.array([], Validators.required),

    });
  }

  onSubmit(): void {
    if (this.CrearReporteform.invalid) return;



  }

  volverAUsuario():void {
    this.router.navigateByUrl('/usuario', { replaceUrl: true });
  }

  /*ngOnInit(): void {

    })
  }

   */
}
