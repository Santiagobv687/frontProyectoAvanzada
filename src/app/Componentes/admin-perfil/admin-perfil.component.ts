import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MapaService} from '../../servicios/mapa.service';
import {UsersService} from '../../servicios/users.service';
import {AuthService} from '../../servicios/auth.service';
import mapboxgl from 'mapbox-gl';
import {RouterModule, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {UserRegistrationRequest} from '../../dto/user-registration-request';
import {ErrorResponse} from '../../dto/error-response';
import {UserEdit} from '../../dto/user-edit';

@Component({
    selector: 'app-admin-perfil',
    standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
    templateUrl: './admin-perfil.component.html',
    styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit, AfterViewInit {
  perfilForm!: FormGroup;
  result = '';
  classResult = 'success';

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private mapaService: MapaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Inicializa el formulario
    this.perfilForm = this.formBuilder.group({
      id: [' '],
      nombre: [''],
      ciudadResidencia: [''],
      telefono: [''],
      direccion: [''],
      correo: [''],
      contraseña: [''],
      ubicacion: [''] // Para el marcador del mapa
    });

    // Obtiene usuario autenticado
    const usuario = this.authService.getUsuario();
    console.log('Usuario desde AuthService:', usuario); // 🔍 Debug

    if (usuario) {
      this.perfilForm.patchValue({
        id: usuario.id || '',
        nombre: usuario.nombre || '',
        ciudadResidencia: usuario.ciudadResidencia || '',
        telefono: usuario.telefono || '',
        direccion: usuario.direccion || '',
        correo: usuario.correo || '',
        contraseña: usuario.contraseña || '',
        ubicacion: usuario.ubicacion || null
      });

      console.log('Valores del formulario después de patchValue:', this.perfilForm.value); // 🔍 Debug
    }
  }

  ngAfterViewInit() {
    this.mapaService.crearMapa();

    this.mapaService.mapa.on('load', () => {
      this.mapaService.mapa.resize();

      // 🔽 Agrega esta parte para marcar ubicación del usuario
      const ubicacion = this.perfilForm.get('ubicacion')?.value;
      if (ubicacion && ubicacion.coordinates) {
        const [lng, lat] = ubicacion.coordinates;
        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(this.mapaService.mapa);

        this.mapaService.mapa.setCenter([lng, lat]); // centrar el mapa
        this.mapaService.mapa.setZoom(15); // zoom opcional
      }
    });

    // Seguir escuchando nuevos marcadores
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.perfilForm.get('ubicacion')?.setValue({
        type: 'Point',
        coordinates: [marcador.lng, marcador.lat]
      });
    });
  }

  onSubmit() {
    const newUser = this.perfilForm.value as UserEdit;
    this.usersService.editar(newUser).subscribe({
      next: data => {
        this.result = 'Perfil modificado correctamente';
        this.classResult = 'success';
      },
      error: error => {
        if (Array.isArray(error.error)) {
          this.result = error.error.map((item: ErrorResponse) => item.message).join(', ');
        } else {
          this.result = error.error.message;
        }
        this.classResult = 'error';
      }
    });
  }

}

