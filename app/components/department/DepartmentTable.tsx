import { selectFilteredDepartment } from "@/app/features/department/departmentSelectors";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import DepartmentRow from "./DepartmentRow";

export default function DepartmentTable() {
  const paginatedDeparments = useAppSelector(selectFilteredDepartment);

  return (
    <div className="w-4xl bg-white rounded-xl shadow-lg">
      <table className="w-4xl bg-white text-black text-[16px]">
        <thead className="bg-blue-950 text-white">
          <tr className="bg-black text-white border-2">
            <th className="w-xl">Department Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {paginatedDeparments.map((dept) => (
            <DepartmentRow key={dept.id} rowData={dept} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
