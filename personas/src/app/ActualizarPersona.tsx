"use client";
import Input from "./components/ui/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./components/ui/button/Button";
import { ModalProps } from "./interfaces/modal.interface";
import { BsFilePost } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { CiMail, CiPhone, CiCirclePlus } from "react-icons/ci";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { PersonaSchema } from "../schemas/Persona.schema";
import axios from "axios";
import { useMutation } from "@/hooks/useMutation";
import { z } from "zod";
import { useTableContext } from "@/context/TableContext";
import { Response, Persona } from "./interfaces/responsefinal.interface";
import { toast } from "sonner";
import Load from "./components/share/load/Load";
import { useQuery } from "../hooks/useQuery";
import { useEffect } from "react";
const dataStatic: Persona[] = [
  {
    idPersona: 1,
    nombre: "Juan Pérez",
    direccion: "Av. Los Olivos 123, Lima",
    correo: "juan.perez@example.com",
    telefono: "987654321",
    fechaNacimiento: "1990-05-12",
  },
  {
    idPersona: 2,
    nombre: "María Rodríguez",
    direccion: "Jr. San Martín 456, Arequipa",
    correo: "maria.rodriguez@example.com",
    telefono: "912345678",
    fechaNacimiento: "1985-09-25",
  },
  {
    idPersona: 3,
    nombre: "Carlos Fernández",
    direccion: "Calle Lima 789, Trujillo",
    correo: "carlos.fernandez@example.com",
    telefono: "999888777",
    fechaNacimiento: "1992-03-18",
  },
  {
    idPersona: 4,
    nombre: "Ana López",
    direccion: "Av. Principal 321, Cusco",
    correo: "ana.lopez@example.com",
    telefono: "922334556",
    fechaNacimiento: "1995-12-02",
  },
  {
    idPersona: 5,
    nombre: "Pedro Sánchez",
    direccion: "Jr. Los Cedros 654, Piura",
    correo: "pedro.sanchez@example.com",
    telefono: "933221110",
    fechaNacimiento: "1988-07-30",
  },
];
interface ActualizarPersonaProps extends ModalProps {
  id: number;
}

export default function ActualizarPersona({
  onClose,
  id,
}: ActualizarPersonaProps) {
  const persona = dataStatic.find((p) => p.idPersona === id);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(PersonaSchema),
  });

  useEffect(() => {
    if (persona) {
      setValue("nombre", persona.nombre);
      setValue("correo", persona.correo);
      setValue("direccion", persona.direccion);
      setValue("telefono", persona.telefono);
      setValue("fechaNacimiento", persona.fechaNacimiento);
    }
  }, [persona, setValue]);

  const onSubmit = (data: z.infer<typeof PersonaSchema>) => {
    console.log("Datos actualizados (simulado):", data);
    toast.success("Persona actualizada (simulación)");
    onClose?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm md:max-w-3xl bg-white p-6 rounded-xl shadow-lg flex flex-col gap-6 dark:bg-gray-800 border dark:border-gray-700"
    >
      <header className="flex items-center gap-x-3">
        <LuUsers size={40} className="text-black-600 dark:text-blue-400" />
        <div className="flex flex-col">
          <p className="text-xl font-semibold dark:text-white">Actualizar Persona</p>
          <p className="text-sm text-gray-500">
            Modifica los datos de la persona
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre Completo"
          icon={<MdOutlinePersonOutline />}
          placeholder="Ej: Juan Pérez"
          {...register("nombre")}
          error={errors.nombre?.message}
        />
        <Input
          label="Dirección"
          icon={<CiMail />}
          placeholder="Ej: Av. Principal 123"
          {...register("direccion")}
          error={errors.direccion?.message}
        />
        <Input
          label="Email"
          type="email"
          icon={<CiMail />}
          placeholder="ejemplo@correo.com"
          {...register("correo")}
          error={errors.correo?.message}
        />
        <Input
          label="Teléfono"
          icon={<LuPhone />}
          placeholder="999 999 999"
          {...register("telefono")}
          error={errors.telefono?.message}
        />
        <Input
          label="Fecha de Nacimiento"
          type="date"
          placeholder="Selecciona una fecha"
          icon={<CiCirclePlus />}
          {...register("fechaNacimiento")}
          error={errors.fechaNacimiento?.message}
        />
      </div>

      <div className="flex justify-end gap-x-4">
        <Button
          type="button"
          className="mt-4 bg-gray-200 text-black hover:bg-gray-300"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button className="flex items-center gap-x-3 mt-4 bg-black text-white py-3 font-semibold hover:bg-black">
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
}