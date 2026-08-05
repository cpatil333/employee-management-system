import React from "react";
import { RecentEmployeesJoin } from "../../types/recentEmployeesJoin.types";
import TableContainer from "../ui/TableContainer";

type RecentEmployeesProps = {
  Data: RecentEmployeesJoin[];
  loading: boolean;
  hasError: boolean;
};

export default function RecentEmployeesTable({
  Data,
  loading,
  hasError,
}: RecentEmployeesProps) {
  if (loading) return <p>Loading...</p>;
  if (hasError) return <p>Unable to load chart data..</p>;
  return (
    <div>
      <TableContainer className="max-w-xl">
        <thead className="bg-blue-950 text-white">
          <tr className="bg-black text-white border-2">
            <th className="w-60">Name</th>
            <th>Joining Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Data.map((emp, index) => (
            <tr key={index} className="border-[1]">
              <td>{emp.name}</td>
              <td>
                {emp.joiningDate
                  ? new Date(emp.joiningDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
}
