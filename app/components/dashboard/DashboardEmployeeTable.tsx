import { EmployeeDashboardTable } from "@/app/types/employeeDashboardTable.types";
import TableContainer from "../ui/TableContainer";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";
import Table from "../ui/table/Table";
import TableHeader from "../ui/table/TableHeader";
import TableRow from "../ui/table/TableRow";
import TableCell from "../ui/table/TableCell";
import TableBody from "../ui/table/TableBody";

type DashboardEmployeeTableProps = {
  tableData: EmployeeDashboardTable[];
  filter: string;
  title: string;
  loading: boolean;
  error: string | null;
};

export default function DashboardEmployeeTable({
  tableData,
  filter,
  title,
  loading,
  error,
}: DashboardEmployeeTableProps) {
  if (loading) return <Loading message="Loading Employee Table..." />;

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Employees - {filter} {title} ({tableData.length})
      </h3>
      <Table>
        <TableHeader>
          <TableRow className="bg-black">
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Designation</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((emp) => (
            <TableRow key={emp.employeeId}>
              <TableCell className="bg-white text-black">{emp.name}</TableCell>
              <TableCell className="bg-white text-black">
                {emp.department}
              </TableCell>
              <TableCell
                className="
                bg-white
                text-black"
              >
                {emp.designation}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
