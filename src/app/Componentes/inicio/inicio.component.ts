import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
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
