"use client";

import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import {
  setIsModalOpen,
  setSearchTerm,
} from "@/app/features/designation/designationSlice";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import DesignationModal from "./DesignationModal";

export default function DesignationToolbar() {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector((state) => state.designation.isModalOpen);

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <button
          onClick={() => {
            dispatch(setIsModalOpen(true));
          }}
          className="w-40 bg-blue-700 p-1 m-5 rounded-xl text-white"
        >
          Add Designation
        </button>
        <input
          type="text"
          placeholder="Search here.."
          className="bg-white text-black rounded-lg px-4 py-2"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>
      {isModalOpen && <DesignationModal />}
    </div>
  );
}
