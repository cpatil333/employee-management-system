import { useAppSelector } from "@/app/hooks/useAppSelector";
import ActionButtons from "../designation/ActionButtons";
import { Designation } from "@/app/types/designation.types";
import Spinner from "../Spinner";

type DesignationRowProps = {
  rowData: Designation;
};

export default function DesignationRow({ rowData }: DesignationRowProps) {
  const { loading } = useAppSelector((state) => state.designation);

  if (loading) {
    return <Spinner />;
  }
  return (
    <tr className="w-2xs border-[3] ">
      <td className="w-150px text-xl">{rowData.name}</td>
      <td>
        <ActionButtons designationId={rowData.id} />
      </td>
    </tr>
  );
}
