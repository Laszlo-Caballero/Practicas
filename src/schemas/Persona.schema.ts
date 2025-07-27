import { z } from "zod";

export const PersonaSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  direccion: z.string().min(1, "La dirección es requerida"),
  correo: z.string().email("Correo electrónico inválido"),
  telefono: z
    .string()
    .min(9, "El teléfono es requerido")
    .max(9, "El teléfono debe tener 9 dígitos"),
  fechaNacimiento: z.string().min(1, "La fecha de nacimiento es requerida"),
});
