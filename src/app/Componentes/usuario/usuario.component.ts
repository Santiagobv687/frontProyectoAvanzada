
import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-usuario',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{
  title = '';

  private map!: mapboxgl.Map;

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiY2FtaWxhMjFkdW4iLCJhIjoiY21hdTgzbmcyMHphYTJtcThmazU1cHo1NiJ9.aBnaFCGSNhwcpNOlRXpl7Q', // Token aquí directamente
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // Coordenadas de ejemplo
      zoom: 9
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
