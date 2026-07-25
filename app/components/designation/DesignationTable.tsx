import { selectFilteredDesignation } from "@/app/features/designation/designationSelectors";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import DesignationRow from "./DesignationRow";

export default function DesignationTable() {
  const paginatedDesignations = useAppSelector(selectFilteredDesignation);

  return (
    <div className="w-4xl bg-white rounded-xl shadow-lg">
      <table className="w-4xl bg-white text-black text-[16px]">
        <thead className="bg-blue-950 text-white">
          <tr className="bg-black text-white border-2">
            <th className="w-xl">Designation Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {paginatedDesignations.map((desg) => (
            <DesignationRow key={desg.id} rowData={desg} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
