import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition ${className}`}
    >
      {children}
    </button>
  );
}
