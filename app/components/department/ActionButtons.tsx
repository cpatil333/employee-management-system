"use client";

import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import {
  fetchDepartmentById,
  setDepartmentDetailModal,
  setIsDeleteModalOpen,
  setIsModalOpen,
} from "@/app/features/department/departmentSlice";
import DepartmentViewModal from "./DepartmentViewModal";
import DeleteEmployeeModal from "./DeleteConfirmationModal";

type ActionButtonsProps = {
  departmentId: number;
};

export default function ActionButtons({ departmentId }: ActionButtonsProps) {
  const dispatch = useAppDispatch();

  const isDeleteModalOpen = useAppSelector(
    (state) => state.designation.isDeleteModalOpen,
  );

  const designationDetailModal = useAppSelector(
    (state) => state.designation.designationDetailModal,
  );

  const handleEdit = () => {
    dispatch(fetchDepartmentById(departmentId));
    dispatch(setIsModalOpen(true));
  };

  const handleView = () => {
    dispatch(setDepartmentDetailModal(true));
    //dispatch(setSelectedEmployee(employeeId));
    dispatch(fetchDepartmentById(departmentId));
  };

  const handleDelete = () => {
    dispatch(setIsDeleteModalOpen(true));
    dispatch(fetchDepartmentById(departmentId));
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
      {isDeleteModalOpen && <DeleteEmployeeModal />}
      {designationDetailModal && <DepartmentViewModal />}
    </div>
  );
}
