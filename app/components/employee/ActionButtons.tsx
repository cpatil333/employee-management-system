import DeleteEmployeeModal from "./DeleteEmployeeModal";
import EmployeeDetailModal from "./EmployeeDetailModal";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import {
  setIsModalOpen,
  setSelectedEmployee,
  setEmployeeDetailModal,
  setIsDeleteModalOpen,
} from "@/app/features/employee/employeeSlice";
import { useAppSelector } from "@/app/hooks/useAppSelector";

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
  const handleEdit = () => {
    dispatch(setSelectedEmployee(employeeId));
    dispatch(setIsModalOpen(true));
  };

  const handleView = () => {
    dispatch(setEmployeeDetailModal(true));
    dispatch(setSelectedEmployee(employeeId));
  };

  const handleDelete = () => {
    dispatch(setIsDeleteModalOpen(true));
    dispatch(setSelectedEmployee(employeeId));
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
      {employeeDetailModal && <EmployeeDetailModal />}
    </div>
  );
}
