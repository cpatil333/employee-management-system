import { Employee } from "@/app/types/empoyee.types";
import ActionButtons from "./ActionButtons";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { STATUS } from "@/app/constant/status.constants";

type EmployeeRowProps = {
  rowData: Employee;
};

export default function EmployeeRow({ rowData }: EmployeeRowProps) {
  const departmentList = useAppSelector(
    (state) => state.department.departmentList,
  );

  const designationtList = useAppSelector(
    (state) => state.designation.designationList,
  );
  return (
    <tr className="border-[1]">
      <td className="w-150px">{rowData.name}</td>
      <td>{rowData.email}</td>
      <td>
        {departmentList.find((d) => d.id === rowData.departmentId)?.name ?? ""}
      </td>
      <td>
        {designationtList.find((d) => d.id === rowData.designationId)?.name ??
          ""}
      </td>
      <td>{rowData.status === STATUS.ACTIVE ? "🟢 Active" : "🔴 Inactive"}</td>
      <td>
        <ActionButtons employeeId={rowData.employeeId} />
      </td>
    </tr>
  );
}
