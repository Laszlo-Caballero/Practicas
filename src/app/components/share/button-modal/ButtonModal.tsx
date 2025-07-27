"use client";
import Button from "./../../ui/button/Button";
import Modal from "./../../ui/modal/Modal";
import { ModalProps } from "./../../../interfaces/modal.interface";
import React, {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useState,
} from "react";

interface CrearProfesionProps {
  modal: ReactNode;
  className?: string;
}

export default function ButtonModal({
  modal,
  className,
  children,
}: PropsWithChildren<CrearProfesionProps>) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        className={className}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {children}
      </Button>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
        >
          {isValidElement(modal) &&
            cloneElement<ModalProps>(modal as ReactElement<ModalProps>, {
              onClose: () => {
                setShowModal(false);
              },
            })}
        </Modal>
      )}
    </>
  );
}
