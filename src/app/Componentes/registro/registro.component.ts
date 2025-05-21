import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {UserRegistrationRequest} from '../../dto/user-registration-request';
import {UsersService} from '../../servicios/users.service';
import {ErrorResponse} from '../../dto/error-response';
import * as mapboxgl from 'mapbox-gl';
import {MapaService} from '../../servicios/mapa.service';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm!: FormGroup;
  result = '';
  classResult = 'success';
  private map!: mapboxgl.Map;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private mapaService: MapaService) {
  }

  ngOnInit() {
    this.crearFormulario();

  }

  ngAfterViewInit() {
    this.mapaService.crearMapa();
    this.mapaService.mapa.on('load', () => {
      this.mapaService.mapa.resize();
    });
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.registroForm.get('ubicacion')?.setValue({
        type: 'Point',
        coordinates: [marcador.lng, marcador.lat]
      });
    });
  }

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      ciudadResidencia: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      ubicacion: [null, Validators.required]
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordsMismatch: true};
  }
/*
  private inicializarMapa() {
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiY2FtaWxhMjFkdW4iLCJhIjoiY21hdTgzbmcyMHphYTJtcThmazU1cHo1NiJ9.aBnaFCGSNhwcpNOlRXpl7Q',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.06, 4.65], // Bogotá
      zoom: 11
    });

    this.map.on('click', (e) => {
      const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      this.registroForm.get('location')?.setValue({
        type: 'Point',
        coordinates: coords
      });
    });
  }


 */
  onSubmit(): void {
    const newUser = this.registroForm.value as UserRegistrationRequest;
    this.usersService.registrar(newUser).subscribe({
      next: data => {
        this.result = 'Usuario registrado correctamente';
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
