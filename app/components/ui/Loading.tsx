import React from "react";

type LoadingProps = {
  message?: string;
};
export default function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-3">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />

      <p className="text-gray-600 text-sm font-medium">{message}</p>
    </div>
  );
}
