import { Department } from "@/app/types/department.types";
import ActionButtons from "../department/ActionButtons";

type DepartmentRowProps = {
  rowData: Department;
};

export default function DepartmentRow({ rowData }: DepartmentRowProps) {
  return (
    <tr className="w-2xs border-[3] ">
      <td className="w-150px text-xl">{rowData.name}</td>
      <td>
        <ActionButtons departmentId={rowData.id} />
      </td>
    </tr>
  );
}
