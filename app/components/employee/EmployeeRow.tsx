import { Employee } from "@/app/types/empoyee.types";
import ActionButtons from "./ActionButtons";
import { department } from "@/app/data/department";
import { designation } from "@/app/data/designation";

type EmployeeRowProps = {
  rowData: Employee;
};

export default function EmployeeRow({ rowData }: EmployeeRowProps) {
  return (
    <tr className="border-[1]">
      <td className="w-150px">{rowData.name}</td>
      <td>{rowData.email}</td>
      <td>
        {department.find((d) => d.id === rowData.departmentId)?.name ?? ""}
      </td>
      <td>
        {designation.find((d) => d.id === rowData.designationId)?.name ?? ""}
      </td>
      <td>{rowData.status === "Active" ? "🟢 Active" : "🔴 Inactive"}</td>
      <td>
        <ActionButtons employeeId={rowData.employeeId} />
      </td>
    </tr>
  );
}
