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
export default function CrearPersona({ onClose }: ModalProps) {
    const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(PersonaSchema),
  });
  const { refresh } = useTableContext<Persona>()

  const { mutate, isLoading } = useMutation<
    z.infer<typeof PersonaSchema>,
    Response<Persona[]>
  >({
    mutationFn: async (data, url, token) => {
      const response = await axios.post(
        `${url}/personas`,
        {
          nombre: data.nombre,
          correo: data.correo,
          direccion: data.direccion,
          telefono: data.telefono,
          fechaNacimiento: data.fechaNacimiento,

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Persona registrada exitosamente");
      refresh(data.data);
      onClose?.();
    },
    onError: () => {
      toast.error(
        "Error al registrar la persona. Por favor, intenta nuevamente."
      );
    },
  });
  return (
    <form
     onSubmit={handleSubmit(mutate)}
      className="w-full max-w-sm md:max-w-3xl bg-white p-6 rounded-xl shadow-lg flex flex-col gap-6 dark:bg-gray-800 border dark:border-gray-700"
    >
      {isLoading && <Load />}
      <header className="flex items-center gap-x-3">
       <LuUsers size={40} className="text-black-600 dark:text-blue-400" />
        <div className="flex flex-col">
          <p className="text-xl font-semibold dark:text-white">Registrar Nueva Persona</p>
          <p className="text-sm text-gray-500">
            Completa los datos para agregar una persona al sistema
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
          Agregar Persona
        </Button>
      </div>
    </form>
  );
}
