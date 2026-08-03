import EmployeeForm from "./EmployeeForm";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { setIsModalOpen } from "@/app/features/employee/employeeSlice";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import Modal from "../ui/Modal";

export default function EmployeeModal() {
  const dispatch = useAppDispatch();

  const selectedEmployee = useAppSelector(
    (state) => state.employee.selectedEmployee,
  );

  const addOrUpdate =
    selectedEmployee === null ? "Add Employees" : "Update Employees";

  return (
    <Modal
      title={addOrUpdate}
      className="max-w-6xl"
      onClose={() => dispatch(setIsModalOpen(false))}
    >
      <EmployeeForm />
    </Modal>
  );
}
