import React from "react";

type Column<T> = {
  header: string;
  accessor: keyof T;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export default function DataTable<T extends { id?: number }>({
  columns,
  data,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 bg-white shadow rounded-lg">
        <thead className="bg-blue-700 text-white">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.accessor)}
                className="p-3 text-left border"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100 border-b">
                {data.map((column) => (
                  <td key={String(column.accessor)} className="p-3 border">
                    {String(row[column.accessor] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-5">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
