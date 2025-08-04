"use client";
import { PropsWithChildren, useState } from "react";
import { useTableContext } from "@/context/TableContext";
import { useMutation } from "@/hooks/useMutation";
import axios from "axios";
import { Response } from "../../../interfaces/responsefinal.interface";
import { toast } from "sonner";
import Load from "../load/Load";
import { LuTriangleAlert } from "react-icons/lu";
import Button from "./../../ui/button/Button";
import Modal from "./../../ui/modal/Modal";

interface DeleteModalProps extends PropsWithChildren {
  id: number | string;
  endpoint: string;
}

export default function DeleteModal<T>({
  id,
  endpoint,
  children,
}: DeleteModalProps) {
  const [open, setOpen] = useState(false);
  const { refresh } = useTableContext<T>();

  const { mutate, isLoading } = useMutation<
    {
      id: number | string;
      endpoint: string;
    },
    Response<T[]>
  >({
    mutationFn: async (data, urlApi, token) => {
      const response = await axios.delete(
        `${urlApi}/${data.endpoint}/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Elemento desactivado correctamente");
      refresh(data?.data);
      setOpen(false);
    },
    onError: () => {
      toast.error(`Error al desactivar el elemento`);
    },
  });

  return (
    <>
      <button onClick={() => setOpen(true)}>{children}</button>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          {isLoading && <Load />}
          <div className="flex flex-col p-10 gap-4 bg-white dark:bg-slate-800 items-center rounded-xl w-full max-w-lg ">
            <div className="flex flex-col items-center justify-center gap-y-3">
              <span className=" p-4 max-w-max rounded-full  border border-red-500 bg-red-100 dark:bg-red-500/10 text-red-500 dark:text-red-400 dark:border-none">
                  <LuTriangleAlert size={30}/>
              </span>
              <h2 className="text-2xl font-bold text-black dark:text-white">
                ¿Seguro de desactivar este elemento?
              </h2>
              <p className="text-xl text-black dark:text-white">
                Esta acción no se puede deshacer. El elemento será eliminado permanentemente.
              </p>
            </div> 
            <div className="flex items-center gap-x-4">
              <Button 
               className="bg-gray-300 text-gray-800 hover:bg-gray-300"
              onClick={() => setOpen(false)}>Cancelar
              </Button>
              <Button
                className="bg-black"
                onClick={() => mutate({ id, endpoint })}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
