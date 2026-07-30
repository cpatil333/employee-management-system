"use client";

import { setDesignationDetailModal } from "@/app/features/designation/designationSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";

export default function DesignationViewModal() {
  const dispatch = useAppDispatch();

  const selectedDesignation = useAppSelector(
    (state) => state.designation.selectedDesignation,
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white max-w-xl w-full h-[30vh] rounded-xl shadow-xl ">
        <div className="flex items-center justify-center border-2 p-2">
          <h2 className="text-2xl font-semibold text-blue-700">
            Designation Details
          </h2>
        </div>
        <div className="flex flex-col ml-20 mt-5 font-semibold text-xl p-2">
          <div className="border-t pt-6">
            <DetailRows label="Name" value={selectedDesignation?.name} />
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              className="bg-blue-700 text-xl text-white p-2 m-2"
              onClick={() => dispatch(setDesignationDetailModal(false))}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
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
