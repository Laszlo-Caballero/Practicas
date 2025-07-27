import cx from "@/libs/cx";
import React, { PropsWithChildren } from "react";

interface BadgeProps {
  className?: string;
}

export default function Badge({
  children,
  className,
}: PropsWithChildren<BadgeProps>) {
  return (
    <span
      className={cx(
        "px-2.5 py-0.5 rounded-full border text-xs max-w-max",
        "border-gray-300 text-gray-700 bg-gray-100",
        "dark:border-gray-500 dark:text-gray-200 dark:bg-gray-700",
        className
      )}
    >
      {children}
    </span>
  );
}
