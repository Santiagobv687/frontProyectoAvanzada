export interface reporteRquest {

  titulo: string;
  descripcion: string;
  usuarioId: string;
  imagenes: string[];
  categorias: string[];
  ubicacion: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
}
