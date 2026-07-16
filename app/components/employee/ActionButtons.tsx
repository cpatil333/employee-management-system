import { Employee } from "@/app/types/empoyee.types";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import EmployeeDetailModal from "./EmployeeDetailModal";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import {
  setIsModalOpen,
  setSelectedEmployee,
} from "@/app/features/employee/employeeSlice";

type ActionButtonsProps = {
  employeeId: number;
};

export default function ActionButtons({ employeeId }: ActionButtonsProps) {
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(setSelectedEmployee(employeeId));
    dispatch(setIsModalOpen(true));
  };

  return (
    <div>
      <button
        className="bg-blue-800 text-white p-1 m-1 w-20"
        onClick={() => {
          // setEmployeeDetailModal(true);
          // setSelectedEmployee(selectedEmployee);
        }}
      >
        👁 View
      </button>
      <button
        className="bg-blue-800 text-white p-1 m-1 w-20"
        onClick={handleEdit}
      >
        ✏ Edit
      </button>
      <button
        className="bg-red-800 text-white p-1 m-1 w-20"
        onClick={() => {
          // setIsDeleteModalOpen(true);
          // setSelectedEmployee(selectedEmployee);
        }}
      >
        🗑 Delete
      </button>
      {/* {isDeleteModalOpen && <DeleteEmployeeModal />}
      {employeeDetailModal && <EmployeeDetailModal />} */}
    </div>
  );
}
