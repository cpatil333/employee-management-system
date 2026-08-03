import React from "react";

type Option = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  label: string;
  name: string;
  options: Option[];
  register: any;
  error?: string;
};

export default function RadioGroup({
  label,
  name,
  options,
  register,
  error,
}: RadioGroupProps) {
  return (
    <div>
      <label className="block font-semibold mb-2">{label}</label>

      <div className="flex gap-5">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input type="radio" value={option.value} {...register(name)} />

            {option.label}
          </label>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
