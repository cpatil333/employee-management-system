import React from "react";

type CheckboxProps = {
  label: string;
  name: string;
  register: any;
  error?: string;
};
export default function Checkbox({
  label,
  name,
  register,
  error,
}: CheckboxProps) {
  return (
    <div>
      <div className="mb-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 accent-blue-600"
            {...register(name)}
          />

          <span>{label}</span>
        </label>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
}
