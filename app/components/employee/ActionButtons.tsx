import { Employee } from "@/app/types/empoyee.types";
import DeleteEmployeeModal from "./DeleteEmployeeModal";
import EmployeeDetailModal from "./EmployeeDetailModal";
import { useEmployee } from "@/app/hooks/useEmployee";

type ActionButtonsProps = {
  selectedEmployee: Employee;
};

export default function ActionButtons({
  selectedEmployee,
}: ActionButtonsProps) {
  const {
    setIsModalOpen,
    setSelectedEmployee,
    employeeDetailModal,
    setEmployeeDetailModal,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  } = useEmployee();

  return (
    <div>
      <button
        className="bg-blue-800 text-white p-1 m-1 w-20"
        onClick={() => {
          setEmployeeDetailModal(true);
          setSelectedEmployee(selectedEmployee);
        }}
      >
        👁 View
      </button>
      <button
        className="bg-blue-800 text-white p-1 m-1 w-20"
        onClick={() => {
          setIsModalOpen(true);
          setSelectedEmployee(selectedEmployee);
        }}
      >
        ✏ Edit
      </button>
      <button
        className="bg-red-800 text-white p-1 m-1 w-20"
        onClick={() => {
          setIsDeleteModalOpen(true);
          setSelectedEmployee(selectedEmployee);
        }}
      >
        🗑 Delete
      </button>
      {isDeleteModalOpen && <DeleteEmployeeModal />}
      {employeeDetailModal && <EmployeeDetailModal />}
    </div>
  );
}
