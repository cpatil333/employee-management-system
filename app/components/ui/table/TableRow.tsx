import React from "react";

type TableRowProps = {
  children: React.ReactNode;
  className?: string;
};
export default function TableRow({ children, className }: TableRowProps) {
  return (
    <tr
      className={`border-b border-gray-200 hover:bg-gray-50 transition ${className}`}
    >
      {children}
    </tr>
  );
}
