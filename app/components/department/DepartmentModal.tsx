import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setIsModalOpen } from "@/app/features/department/departmentSlice";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import DepartmentForm from "./DepartmentForm";

export default function DepartmentModal() {
  const dispatch = useAppDispatch();

  const selectedDepartment = useAppSelector(
    (state) => state.department.selectedDepartment,
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl h-[40vh]">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-2xl font-semibold text-blue-700">
            {selectedDepartment === null
              ? "Add Department"
              : "Update Department"}
          </h2>

          <button
            onClick={() => dispatch(setIsModalOpen(false))}
            className="text-2xl font-bold text-red-600 hover:text-red-800"
          >
            ✕
          </button>
        </div>

        <DepartmentForm />
      </div>
    </div>
  );
}
