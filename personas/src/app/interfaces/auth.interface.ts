export interface UserReponse {
  idUsuario: number;
  usuario: string;
  contrasena: string;
  correo: string;
  persona: Persona;
  token: string;
}

export interface Persona {
  idPersona: number;
  nombre: string; 
  direccion: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
}
