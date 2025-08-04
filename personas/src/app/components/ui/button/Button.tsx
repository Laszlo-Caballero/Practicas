import cx from "@/libs/cx";
import React, { ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cx(
        `px-4 py-2 rounded-md bg-blue-600 text-white text-sm cursor-pointer`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
