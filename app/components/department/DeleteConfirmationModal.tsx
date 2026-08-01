"use client";
import {
  deleteDepartmentAsync,
  setIsDeleteModalOpen,
} from "@/app/features/department/departmentSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function DeleteEmployeeModal() {
  const dispatch = useAppDispatch();

  const selectedDepartment = useAppSelector(
    (state) => state.department.selectedDepartment,
  );

  return (
    <Modal
      title="Delete Department"
      onClose={() => dispatch(setIsDeleteModalOpen(false))}
    >
      <p>Are you sure?</p>
      <div className="flex justify-end gap-3 mt-6">
        <Button
          onClick={() => dispatch(setIsDeleteModalOpen(false))}
          className="bg-gray-500"
        >
          Cancel
        </Button>

        <Button
          className="bg-red-600"
          onClick={() => {
            dispatch(deleteDepartmentAsync(Number(selectedDepartment?.id)));
            toast.success("Department deleted");
            dispatch(setIsDeleteModalOpen(false));
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}
