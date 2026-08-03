import { selectPaginatedDepartments } from "@/app/features/department/departmentSelectors";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import DepartmentRow from "./DepartmentRow";
import Spinner from "../ui/Spinner";

import {
  setCurrentPage,
  setSort,
} from "@/app/features/department/departmentSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import TableContainer from "../ui/TableContainer";
import SortIcon from "../ui/SortIcon";
import EmptyState from "../ui/EmptyState";

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

  const hasDepartments = paginatedDeparments.length > 0;

  return (
    <>
      {hasDepartments ? (
        <TableContainer className="max-w-4xl">
          <thead className="bg-blue-950 text-white">
            <tr className="bg-black text-white border-2">
              <th onClick={() => handleSort("name")}>
                Name
                <SortIcon active={sortField === "name"} order={sortOrder} />
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedDeparments.map((dept) => (
              <DepartmentRow key={dept.id} rowData={dept} />
            ))}
          </tbody>
        </TableContainer>
      ) : (
        <div>
          <EmptyState message="No departments found." />
        </div>
      )}
    </>
  );
}
