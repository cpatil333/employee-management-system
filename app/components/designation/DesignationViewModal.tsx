"use client";

import { setDesignationDetailModal } from "@/app/features/designation/designationSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import Modal from "../ui/Modal";

export default function DesignationViewModal() {
  const dispatch = useAppDispatch();

  const selectedDesignation = useAppSelector(
    (state) => state.designation.selectedDesignation,
  );

  return (
    <Modal
      title="Designation Details"
      onClose={() => dispatch(setDesignationDetailModal(false))}
    >
      <DetailRows label="Designation" value={selectedDesignation?.name} />
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
