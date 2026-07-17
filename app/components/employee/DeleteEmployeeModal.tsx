import {
  deleteEmployee,
  setIsDeleteModalOpen,
} from "@/app/features/employee/employeeSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";

export default function DeleteEmployeeModal() {
  const dispatch = useAppDispatch();

  const selectedEmployee = useAppSelector(
    (state) => state.employee.selectedEmployee,
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-100 max-w-5xl h-[30vh]">
        <div className="flex items-center justify-between border-2 p-4">
          <h2 className="text-2xl font-semibold text-blue-700">
            Delete Employee
          </h2>
          <button
            onClick={() => dispatch(setIsDeleteModalOpen(false))}
            className="text-2xl font-bold text-red-600 hover:text-red-800"
          >
            ✕
          </button>
        </div>
        <div className="max-w-xl mt-10 ml-10">
          Are you sure you want to delete
          <strong> {selectedEmployee?.name}</strong>?
          <div>
            <button
              className="bg-blue-700 text-xl text-white p-2 m-2"
              onClick={() => dispatch(setIsDeleteModalOpen(false))}
            >
              Cancel
            </button>
            <button
              className="bg-red-700 text-xl text-white p-2 m-2"
              onClick={() => {
                dispatch(deleteEmployee(Number(selectedEmployee?.employeeId)));
                dispatch(setIsDeleteModalOpen(false));
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
