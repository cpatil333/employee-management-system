"use client";

import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import {
  deleteDepartmentAsync,
  fetchDepartmentById,
  setDepartmentDetailModal,
  setIsDeleteModalOpen,
  setIsModalOpen,
} from "@/app/features/department/departmentSlice";
import DepartmentViewModal from "./DepartmentViewModal";
import DeleteModal from "../ui/DeleteModal";
import toast from "react-hot-toast";

type ActionButtonsProps = {
  departmentId: number;
};

export default function ActionButtons({ departmentId }: ActionButtonsProps) {
  const dispatch = useAppDispatch();

  const isDeleteModalOpen = useAppSelector(
    (state) => state.department.isDeleteModalOpen,
  );

  const departmentDetailModal = useAppSelector(
    (state) => state.department.departmentDetailModal,
  );
  const selectedDepartment = useAppSelector(
    (state) => state.department.selectedDepartment,
  );

  const handleEdit = () => {
    dispatch(fetchDepartmentById(departmentId));
    dispatch(setIsModalOpen(true));
  };

  const handleView = () => {
    dispatch(setDepartmentDetailModal(true));
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
      {isDeleteModalOpen && (
        <DeleteModal
          title="Delete Department"
          message="Are you sure you want to delete this Department?"
          onCancel={() => dispatch(setIsDeleteModalOpen(false))}
          onConfirm={() => {
            dispatch(deleteDepartmentAsync(Number(selectedDepartment?.id)));
            toast.success("Department Deleted");
            dispatch(setIsDeleteModalOpen(false));
          }}
        />
      )}
      {departmentDetailModal && <DepartmentViewModal />}
    </div>
  );
}
