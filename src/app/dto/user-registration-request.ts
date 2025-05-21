export interface UserRegistrationRequest {
  id: string;
  nombre: string;
  ciudadResidencia: string;
  telefono: string;
  direccion: string;
  correo: string;
  contraseña: string;
  ubicacion: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
}
