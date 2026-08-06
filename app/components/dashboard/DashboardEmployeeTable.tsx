import { EmployeeDashboardTable } from "@/app/types/employeeDashboardTable.types";
import TableContainer from "../ui/TableContainer";

type DashboardEmployeeTableProps = {
  tableData: EmployeeDashboardTable[];
  title: string;
  loading: boolean;
  hasError: boolean;
};

export default function DashboardEmployeeTable({
  tableData,
  title,
  loading,
  hasError,
}: DashboardEmployeeTableProps) {
  if (loading) return <p>Loading...</p>;
  if (hasError)
    return (
      <p className="text-red-500">Unable to load Employees Department data</p>
    );
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Employees - {title} ({tableData.length})
      </h3>
      <TableContainer className="max-w-full min-h-80">
        <thead className="bg-blue-950 text-white">
          <tr className="bg-black text-white border-2">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Designation</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tableData.length > 0 ? (
            <>
              {tableData.map((emp) => (
                <tr
                  key={emp.employeeId}
                  className="hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.department}</td>
                  <td className="px-4 py-2">{emp.designation}</td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-6 text-gray-500">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </TableContainer>
    </div>
  );
}
