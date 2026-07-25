import ActionButtons from "../designation/ActionButtons";
import { Designation } from "@/app/types/designation.types";

type DesignationRowProps = {
  rowData: Designation;
};

export default function DesignationRow({ rowData }: DesignationRowProps) {
  return (
    <tr className="w-2xs border-[3] ">
      <td className="w-150px text-xl">{rowData.name}</td>
      <td>
        <ActionButtons designationId={rowData.id} />
      </td>
    </tr>
  );
}
