import { Employee } from "@/app/types/empoyee.types";
import { useState } from "react";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

type ActionButtonsProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
  rowData: Employee;
};

export default function ActionButtons({
  setIsModalOpen,
  setSelectedEmployee,
  rowData,
}: ActionButtonsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <div>
      <button className="bg-blue-800 text-white p-1 m-1 w-20">👁 View</button>
      <button
        className="bg-blue-800 text-white p-1 m-1 w-20"
        onClick={() => {
          setIsModalOpen(true);
          setSelectedEmployee(rowData);
        }}
      >
        ✏ Edit
      </button>
      <button
        className="bg-red-800 text-white p-1 m-1 w-20"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        🗑 Delete
      </button>
      {isDeleteModalOpen && (
        <DeleteEmployeeModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedUser={rowData}
        />
      )}
    </div>
  );
}
