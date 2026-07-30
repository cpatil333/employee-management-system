import { Department } from "@/app/types/department.types";
import ActionButtons from "../department/ActionButtons";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import Spinner from "../Spinner";

type DepartmentRowProps = {
  rowData: Department;
};

export default function DepartmentRow({ rowData }: DepartmentRowProps) {
  const { loading } = useAppSelector((state) => state.department);

  if (loading) {
    return <Spinner />;
  }

  return (
    <tr className="w-2xs border-[3] ">
      <td className="w-150px text-xl">{rowData.name}</td>
      <td>
        <ActionButtons departmentId={rowData.id} />
      </td>
    </tr>
  );
}
