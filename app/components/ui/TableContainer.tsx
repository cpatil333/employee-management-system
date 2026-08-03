import React from "react";

type TableContainerProps = {
  children: React.ReactNode;
  className: string;
};
export default function TableContainer({
  children,
  className,
}: TableContainerProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-black border-collapse">{children}</table>
      </div>
    </div>
  );
}
