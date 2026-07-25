import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  }[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 px-6 py-4 rounded-lg shadow-xl text-white ${bgColor}`}
    >
      {message}
    </div>
  );
}
