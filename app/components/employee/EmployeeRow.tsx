import { Employee } from "@/app/types/empoyee.types";

import ActionButtons from "./ActionButtons";

type EmployeeRowProps = {
  rowData: Employee;
};

export default function EmployeeRow({ rowData }: EmployeeRowProps) {
  return (
    <tr className="border-[1]">
      <td className="w-150px">{rowData.name}</td>
      <td>{rowData.email}</td>
      <td>{rowData.department.name}</td>
      <td>{rowData.designation.name}</td>
      <td>{rowData.status === "Active" ? "🟢 Active" : "🔴 Inactive"}</td>
      <td>
        <ActionButtons />
      </td>
    </tr>
  );
}
