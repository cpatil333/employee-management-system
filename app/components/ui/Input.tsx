import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="mb-4">
      <label className="font-semibold text-black">{label}</label>

      <input {...props} className="w-full border rounded-md p-2 mt-1" />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
