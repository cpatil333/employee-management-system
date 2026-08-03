import { InputHTMLAttributes } from "react";

type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export default function TextArea({ label, error, ...props }: TextAreaProps) {
  return (
    <div className="mb-4">
      <label className="font-semibold text-black">{label}</label>

      <textarea
        {...props}
        className="w-full border rounded-md p-2 mt-1 resize-none"
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
