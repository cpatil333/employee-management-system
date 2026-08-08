import React from "react";

type TableBodyProps = {
  children: React.ReactNode;
};
export default function TableBody({ children }: TableBodyProps) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
  );
}
