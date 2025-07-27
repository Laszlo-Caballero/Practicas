import React from "react";
import CrearPersona from "./crearPersona";
import { TableProvider } from "@/context/TableContext";
import { FiPlus } from "react-icons/fi";
import ButtonModal from "./components/share/button-modal/ButtonModal";
import { ApiRequest } from "../libs/api";
import ActualizarPersona from "./ActualizarPersona";
import { LuSquarePen } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import DeleteModal from "./components/share/delete-modal/DeleteModal";
import ListarPersona from "./listarPersona";
import Tabs from "../app/components/ui/tabs/Tabs";
import { Response, Persona } from "./interfaces/responsefinal.interface";
const dataStatic: Persona[] = [
  {
    idPersona: 1,
    nombre: "Juan Pérez",
    direccion: "Av. Los Olivos 123, Lima",
    correo: "juan.perez@example.com",
    telefono: "+51 987 654 321",
    fechaNacimiento: "1990-05-12",
  },
  {
    idPersona: 2,
    nombre: "María Rodríguez",
    direccion: "Jr. San Martín 456, Arequipa",
    correo: "maria.rodriguez@example.com",
    telefono: "+51 912 345 678",
    fechaNacimiento: "1985-09-25",
  },
  {
    idPersona: 3,
    nombre: "Carlos Fernández",
    direccion: "Calle Lima 789, Trujillo",
    correo: "carlos.fernandez@example.com",
    telefono: "+51 999 888 777",
    fechaNacimiento: "1992-03-18",
  },
  {
    idPersona: 4,
    nombre: "Ana López",
    direccion: "Av. Principal 321, Cusco",
    correo: "ana.lopez@example.com",
    telefono: "+51 922 334 556",
    fechaNacimiento: "1995-12-02",
  },
  {
    idPersona: 5,
    nombre: "Pedro Sánchez",
    direccion: "Jr. Los Cedros 654, Piura",
    correo: "pedro.sanchez@example.com",
    telefono: "+51 933 221 110",
    fechaNacimiento: "1988-07-30",
  },
];

export default async function Personas() {
  const data = await ApiRequest<Persona[]>({
    metod: "get",
    endpoint: "persona",
  });
return (
  <TableProvider>
    <div className="min-h-screen bg-gray-100 py-2 px-6">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Gestión de Personas
            </h1>
            <p className="text-sm text-gray-600">
              Administra la información de las personas en el sistema
            </p>
          </div>

          <div className="flex justify-end items-center mb-4 flex-wrap gap-2">
            <ButtonModal
              className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2"
              modal={<CrearPersona />}
            >
              <FiPlus size={30} />
              Nueva Persona
            </ButtonModal>
          </div>
        </div>
        <ListarPersona data={dataStatic} />
      </div>
    </div>
  </TableProvider>
);

};

