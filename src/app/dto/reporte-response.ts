export interface reporteResponse {
  titulo: string;
  descripcion: string;
  usuarioId: string;
  imagenes: string[];
  categoria: string;
  ubicacion: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  estado: string;
}
