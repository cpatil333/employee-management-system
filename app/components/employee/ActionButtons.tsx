"use client";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import EmployeeDetailModal from "./EmployeeDetailModal";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";

import {
  deleteEmployeeAsync,
  fetchEmployeeById,
  setEmployeeDetailModal,
  setIsDeleteModalOpen,
  setIsModalOpen,
} from "@/app/features/employee/employeeSlice";
import DeleteModal from "../ui/DeleteModal";
import toast from "react-hot-toast";

type ActionButtonsProps = {
  employeeId: number;
};

export default function ActionButtons({ employeeId }: ActionButtonsProps) {
  const dispatch = useAppDispatch();

  const isDeleteModalOpen = useAppSelector(
    (state) => state.employee.isDeleteModalOpen,
  );

  const employeeDetailModal = useAppSelector(
    (state) => state.employee.employeeDetailModal,
  );

  const selectedEmployee = useAppSelector(
    (state) => state.employee.selectedEmployee,
  );

  const handleEdit = () => {
    dispatch(fetchEmployeeById(employeeId));
    dispatch(setIsModalOpen(true));
  };

  const handleView = () => {
    dispatch(setEmployeeDetailModal(true));
    dispatch(fetchEmployeeById(employeeId));
  };

  const handleDelete = () => {
    dispatch(fetchEmployeeById(employeeId));
    dispatch(setIsDeleteModalOpen(true));
  };

  return (
    <div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white p-1 round m-1 w-20"
        onClick={handleView}
      >
        👁 View
      </button>
      <button
        className="bg-green-600 hover:bg-green-700 text-white p-1 m-1 w-20"
        onClick={handleEdit}
      >
        ✏ Edit
      </button>
      <button
        className="bg-red-600 hover:bg-red-700 text-white p-1 m-1 w-20"
        onClick={handleDelete}
      >
        🗑 Delete
      </button>
      {isDeleteModalOpen && (
        <DeleteModal
          title="Delete Employee"
          message="Are you sure you want delete this employee?"
          onCancel={() => dispatch(setIsDeleteModalOpen(false))}
          onConfirm={() => {
            dispatch(deleteEmployeeAsync(Number(selectedEmployee?.employeeId)));
            toast.success("Employee deleted");
            dispatch(setIsDeleteModalOpen(false));
          }}
        />
      )}
      {employeeDetailModal && <EmployeeDetailModal />}
    </div>
  );
}
