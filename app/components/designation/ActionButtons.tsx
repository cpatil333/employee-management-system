"use client";

import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import {
  fetchDesignationById,
  setDesignationDetailModal,
  setIsDeleteModalOpen,
  setIsModalOpen,
} from "@/app/features/designation/designationSlice";
import DeleteDesignationModal from "./DeleteConfirmationModal";
import DesignationViewModal from "./DesignationViewModal";

type ActionButtonsProps = {
  designationId: number;
};

export default function ActionButtons({ designationId }: ActionButtonsProps) {
  const dispatch = useAppDispatch();

  const isDeleteModalOpen = useAppSelector(
    (state) => state.designation.isDeleteModalOpen,
  );

  const departmentDetailModal = useAppSelector(
    (state) => state.designation.designationDetailModal,
  );

  const handleEdit = () => {
    dispatch(fetchDesignationById(designationId));
    dispatch(setIsModalOpen(true));
  };

  const handleView = () => {
    dispatch(setDesignationDetailModal(true));
    //dispatch(setSelectedEmployee(employeeId));
    dispatch(fetchDesignationById(designationId));
  };

  const handleDelete = () => {
    dispatch(setIsDeleteModalOpen(true));
    dispatch(fetchDesignationById(designationId));
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
      {isDeleteModalOpen && <DeleteDesignationModal />}
      {departmentDetailModal && <DesignationViewModal />}
    </div>
  );
}
