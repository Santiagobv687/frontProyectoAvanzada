export interface UserResponse {
  id: string;
  nombre: string;
  ciudadResidencia: string;
  telefono: string;
  direccion: string;
  correo: string;
  ubicacion: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  rol: string
}
