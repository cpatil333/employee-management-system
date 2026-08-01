"use client";
import { setDepartmentDetailModal } from "@/app/features/department/departmentSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import Modal from "../ui/Modal";
import { useAppSelector } from "@/app/hooks/useAppSelector";

export default function DepartmentViewModal() {
  console.log("DepartmentViewModal Rendered");
  const dispatch = useAppDispatch();

  const selectedDepartment = useAppSelector(
    (state) => state.department.selectedDepartment,
  );

  console.log(selectedDepartment);
  return (
    <Modal
      title="Department Details"
      onClose={() => dispatch(setDepartmentDetailModal(false))}
    >
      <DetailRows label="Department" value={selectedDepartment?.name} />
    </Modal>
  );
}

//Calling row per lable and values for display
type DetailRowProps = {
  label: string;
  value: React.ReactNode;
};

function DetailRows({ label, value }: DetailRowProps) {
  return (
    <div className="grid grid-cols-[180px_1fr] py-2 border-b border-gray-200">
      <span className="font-semibold text-gray-700">{label}</span>
      <span>{value}</span>
    </div>
  );
}
