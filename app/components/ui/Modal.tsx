import React from "react";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-2xl font-bold text-blue-700">{title}</h2>

          <button onClick={onClose} className="text-red-600 text-2xl font-bold">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
