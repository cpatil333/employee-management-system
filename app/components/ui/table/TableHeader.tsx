import React from "react";

type TableHeaderProps = {
  children: React.ReactNode;
};

export default function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead className="bg-black text-xl font-bold text-white">{children}</thead>
  );
}
