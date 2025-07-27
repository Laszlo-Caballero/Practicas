"use client";

import Input from "./components/ui/input/Input";
import Button from "./components/ui/button/Button";
import { ModalProps } from "./interfaces/modal.interface";
import { BsFilePost } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { CiMail, CiPhone, CiCirclePlus } from "react-icons/ci";
import { MdOutlinePersonOutline } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
export default function CrearPersona({ onClose }: ModalProps) {
  return (
    <form
      className="w-full max-w-sm md:max-w-3xl bg-white p-6 rounded-xl shadow-lg flex flex-col gap-6 dark:bg-gray-800 border dark:border-gray-700"
    >
      <header className="flex items-center gap-x-3">
       <LuUsers size={40} className="text-black-600 dark:text-blue-400" />
        <div className="flex flex-col">
          <p className="text-xl font-semibold dark:text-white">Registrar Nueva Persona</p>
          <p className="text-sm text-gray-500">
            Completa los datos para agregar una persona al sistema
          </p>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Nombre Completo"
          icon={<MdOutlinePersonOutline />}
          placeholder="Ej: Juan Pérez"
          name="nombreCompleto"
        />
        <Input
          label="Dirección"
          icon={<CiMail />}
          placeholder="Ej: Av. Principal 123"
          name="direccion"
        />
        <Input
          label="Email"
          type="email"
          icon={<CiMail />}
          placeholder="ejemplo@correo.com"
          name="email"
        />
        <Input
          label="Teléfono"
          icon={<LuPhone />}
          placeholder="999 999 999"
          name="telefono"
        />
        <Input
          label="Fecha de Nacimiento"
          type="date"
          placeholder="Selecciona una fecha"
          icon={<CiCirclePlus />}
          name="fechaNacimiento"
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
