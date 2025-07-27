export interface Persona {
  idPersona: number;
  nombre: string; 
  direccion: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
}
export interface Response<T> {
  message: string;
  status: number;
  data: T;
}