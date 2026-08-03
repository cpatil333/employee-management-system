import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import DesignationForm from "./DesignationForm";
import { setIsModalOpen } from "@/app/features/designation/designationSlice";
import Modal from "../ui/Modal";

export default function DesignationModal() {
  const dispatch = useAppDispatch();

  const selectedDesignation = useAppSelector(
    (state) => state.designation.selectedDesignation,
  );

  const addOrUpdate =
    selectedDesignation === null ? "Add Designation" : "Update Designation";

  return (
    <Modal
      className="max-w-xl"
      title={addOrUpdate}
      onClose={() => dispatch(setIsModalOpen(false))}
    >
      <DesignationForm />
    </Modal>
  );
}
