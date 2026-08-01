"use client";

import {
  deleteDesignationAsync,
  setIsDeleteModalOpen,
} from "@/app/features/designation/designationSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function DeleteDesignationModal() {
  const dispatch = useAppDispatch();

  const selectedDesignation = useAppSelector(
    (state) => state.designation.selectedDesignation,
  );

  return (
    <Modal
      title="Desigantion Delete"
      onClose={() => dispatch(setIsDeleteModalOpen(false))}
    >
      <p>Are you sure</p>
      <div className="flex justify-end gap-3 p-6">
        <Button
          className="bg-gray-500"
          onClick={() => dispatch(setIsDeleteModalOpen(false))}
        >
          Close
        </Button>
        <Button
          className="bg-red-600"
          onClick={() => {
            dispatch(deleteDesignationAsync(Number(selectedDesignation?.id)));
            toast.success("Designation Delete");
            dispatch(setIsDeleteModalOpen(false));
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}
