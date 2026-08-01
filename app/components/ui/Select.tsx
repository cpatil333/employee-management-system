import React from "react";

type SelectProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  label,
  error,
  children,
  ...props
}: SelectProps) {
  return (
    <div className="mb-4">
      <label>{label}</label>
      <select {...props} className="w-full border rounded p-2">
        {children}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
