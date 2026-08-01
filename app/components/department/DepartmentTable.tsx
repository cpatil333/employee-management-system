import {
  selectFilteredDepartment,
  selectPaginatedDepartments,
} from "@/app/features/department/departmentSelectors";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import DepartmentRow from "./DepartmentRow";
import Spinner from "../ui/Spinner";

import {
  setCurrentPage,
  setSort,
} from "@/app/features/department/departmentSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";

export default function DepartmentTable() {
  const dispatch = useAppDispatch();
  const paginatedDeparments = useAppSelector(selectPaginatedDepartments);

  const { loading } = useAppSelector((state) => state.department);
  const { sortField, sortOrder } = useAppSelector((state) => state.department);

  const handleSort = (field: "name") => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";

    dispatch(
      setSort({
        field,
        order,
      }),
    );

    dispatch(setCurrentPage(1));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-4xl bg-white rounded-xl shadow-lg">
      <table className="w-4xl bg-white text-black text-[16px]">
        <thead className="bg-blue-950 text-white">
          <tr className="bg-black text-white border-2">
            <th onClick={() => handleSort("name")}>
              Name
              {sortField === "name" && (sortOrder === "asc" ? " ▲" : " ▼")}
            </th>
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
