import React from "react";
import EmployeeForm from "./EmployeeForm";
import { useEmployee } from "@/app/hooks/useEmployee";

export default function EmployeeModal() {
  const { selectedEmployee, setIsModalOpen } = useEmployee();
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl h-[90vh]">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-2xl font-semibold text-blue-700">
            {selectedEmployee === null ? "Add Employee" : "Update Employee"}
          </h2>

          <button
            onClick={() => setIsModalOpen(false)}
            className="text-2xl font-bold text-red-600 hover:text-red-800"
          >
            ✕
          </button>
        </div>

        <EmployeeForm />
      </div>
    </div>
  );
}
