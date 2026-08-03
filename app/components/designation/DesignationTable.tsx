import { selectPaginatedDesignation } from "@/app/features/designation/designationSelectors";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import DesignationRow from "./DesignationRow";
import Spinner from "../ui/Spinner";
import TableContainer from "../ui/TableContainer";
import SortIcon from "../ui/SortIcon";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import {
  setCurrentPage,
  setSort,
} from "@/app/features/designation/designationSlice";
import EmptyState from "../ui/EmptyState";

export default function DesignationTable() {
  const dispatch = useAppDispatch();
  const paginatedDesignations = useAppSelector(selectPaginatedDesignation);
  const { loading } = useAppSelector((state) => state.employee);
  const { sortField, sortOrder } = useAppSelector((state) => state.designation);

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
  const hasDesignations = paginatedDesignations.length > 0;

  return (
    <>
      {hasDesignations ? (
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
            {paginatedDesignations.map((desg) => (
              <DesignationRow key={desg.id} rowData={desg} />
            ))}
          </tbody>
        </TableContainer>
      ) : (
        <EmptyState message="No Desigations found.." />
      )}
    </>
  );
}
