import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MapaService} from '../../servicios/mapa.service';
import {UsersService} from '../../servicios/users.service';
import {AuthService} from '../../servicios/auth.service';
import mapboxgl from 'mapbox-gl';

@Component({
    selector: 'app-admin-perfil',
    templateUrl: './admin-perfil.component.html',
    imports: [
        ReactiveFormsModule
    ],
    styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit, AfterViewInit {
  perfilForm!: FormGroup;

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
      ciudad: [''],
      telefono: [''],
      direccion: [''],
      email: [''],
      contrasena: [''],
      ubicacion: [''] // Para el marcador del mapa
    });

    // Obtiene usuario autenticado
    const usuario = this.authService.getUsuario();
    if (usuario) {
      this.perfilForm.patchValue({
        id: usuario.id || '',
        nombre: usuario.nombre || '',
        ciudad: usuario.ciudad || '',
        telefono: usuario.telefono || '',
        direccion: usuario.direccion || '',
        email: usuario.email || '',
        ubicacion: usuario.ubicacion || null
        // Nota: no rellenamos la contraseña por seguridad
      });
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

  }
}

