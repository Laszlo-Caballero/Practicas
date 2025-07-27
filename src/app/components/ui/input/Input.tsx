import cx from "@/libs/cx";
import {
  cloneElement,
  InputHTMLAttributes,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  icon?: ReactNode;
  className?: string;
  classNameContainer?: string;
  error?: string;
}

export default function Input({
  className,
  icon,
  id,
  label,
  classNameContainer,
  error,
  ...props
}: InputProps) {
  const parseIcon = icon as ReactElement<{
    size?: number;
    color?: string;
    className?: string;
  }>;

  return (
    <div className={cx("flex flex-col gap-y-2", classNameContainer)}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-black"
      >
        {label}
      </label>
      <div className="w-full relative">
        {isValidElement(icon) &&
          cloneElement(parseIcon, {
            size: 20,
            className: cx(
              "absolute top-1/2 -translate-y-1/2 left-3 text-slate-500",
              parseIcon.props.className
            ),
            color: "#94A3B8",
          })}
        <input
          id={id}
          className={cx(
            "w-full px-10 py-2 border border-slate-300 placeholder:text-gray-500 dark:placeholder:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-500/40",
            className,
            error &&
              "border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500 placeholder:text-red-500 dark:placeholder:text-red-500"
          )}
          {...props}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
