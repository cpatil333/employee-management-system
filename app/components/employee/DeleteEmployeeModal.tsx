"use client";
import {
  deleteEmployeeAsync,
  setIsDeleteModalOpen,
} from "@/app/features/employee/employeeSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function DeleteEmployeeModal() {
  const dispatch = useAppDispatch();

  const selectedEmployee = useAppSelector(
    (state) => state.employee.selectedEmployee,
  );

  return (
    <Modal
      title="Delete Employee"
      className="max-w-xl"
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
            dispatch(deleteEmployeeAsync(Number(selectedEmployee?.employeeId)));
            toast.success("Employee deleted");
            dispatch(setIsDeleteModalOpen(false));
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}
