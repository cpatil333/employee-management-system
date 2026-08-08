import React from "react";

type TableCellProps = {
  children: React.ReactNode;
  className?: string;
};
export default function TableCell({ children, className }: TableCellProps) {
  return <td className={`px-5 py-4  text-left ${className}`}>{children}</td>;
}
