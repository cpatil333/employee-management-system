import React from "react";

type TableProps = {
  children: React.ReactNode;
};
export default function Table({ children }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}
