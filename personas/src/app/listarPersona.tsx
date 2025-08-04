"use client";
import Table from "./components/ui/table/Table";
import React from "react";
import { LuFilter } from "react-icons/lu";
import { AiOutlineMail } from "react-icons/ai";
import { LuPhone } from "react-icons/lu";
import { HiOutlineLocationMarker } from "react-icons/hi";
import cx from "@/libs/cx";
import { LuSquarePen } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import Badge from "./components/ui/badge/Badge";
import { Persona } from "./interfaces/responsefinal.interface";
import DeleteModal from "./components/share/delete-modal/DeleteModal";
import ButtonModal from "./components/share/button-modal/ButtonModal";
import ActualizarPersona from "./ActualizarPersona";

interface ListarPersonaProps {
  data?: Persona[] | null;
}

export default function ListarPersona({ data }: ListarPersonaProps) {
  return (
    <div className="flex w-full flex-col gap-y-4">
    <div className="p-0">
        <div className="flex items-center justify-between w-full">
        </div>
        <Table
          className="mt-2"
          data={data ?? []}
          columns={[
             {
              header: "ID",
              cell: (props) => {
                return (
                  <div className="flex flex-col dark:text-gray-300">
                    <p className="font-medium">{props.row?.idPersona}</p>
                  </div>
                );
              },
            },
            {
              header: "Persona",
              cell: (props) => {
                return (
                  <div className="flex flex-col dark:text-gray-300">
                    <p className="font-medium">{props.row?.nombre}</p>
                    <p className="text-sm text-gray-500">
                      {props.row?.direccion}
                    </p>
                  </div>
                );
              },
            },
            {
              header: "Email",
              cell: (props) => {
                return (
                  <div className="flex flex-col dark:text-gray-400">
                    <span className="flex items-center gap-x-2">
                      <AiOutlineMail className="text-blue-400" />
                      <p className="text-sm">{props.row?.correo}</p>
                    </span>
                  </div>
                );
              },
            },
            {
              header: "Telefono",
              cell: (props) => {
                return (
                  <div className="flex flex-col">
                    <span className="flex items-center gap-x-2">
                      <LuPhone className="text-green-400" />
                      <p className="text-sm">{props.row?.telefono}</p>
                    </span>
                  </div>
                );
              },
            },
            {
              header: "Fecha de nacimiento",
              cell: (props) => {
                return (
                  <div className="flex flex-col">
                    <span className="flex items-center gap-x-2">
                      <p className="text-sm">{props.row?.fechaNacimiento}</p>
                    </span>
                  </div>
                );
              },
            },
            {
              header: "Acciones",
              cell: (props) => {
                return (
                  <span className="flex items-center gap-x-4">
                    <ButtonModal
                      className="bg-transparent p-0"
                      modal={<ActualizarPersona id={props.row?.idPersona} />}
                    >
                      <LuSquarePen className="text-red-500" size={20} />
                    </ButtonModal>
                    <DeleteModal id={props.row?.idPersona} endpoint="">
                      <LuTrash2
                        className="text-gray-900 dark:text-gray-400 cursor-pointer"
                        size={20}
                      />
                    </DeleteModal>
                  </span>
                );
              },
            },
          ]}
        />
      </div>
      <div className="flex justify-end mt-4 px-4">
      <Badge className="bg-gray-50 text-sm text-gray-600 font-bold border-gray-300 px-4 py-2">
            Total de registros: 5
      </Badge>
      </div>
    </div>
  );
}
