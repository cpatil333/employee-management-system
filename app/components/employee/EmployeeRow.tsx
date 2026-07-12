import { Employee } from "@/app/types/empoyee.types";
import ActionButtons from "./ActionButtons";
import { department } from "@/app/data/department";
import { designation } from "@/app/data/designation";
import React from "react";

type EmployeeRowProps = {
  rowData: Employee;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
};

export default function EmployeeRow({
  rowData,
  setIsModalOpen,
  setSelectedEmployee,
}: EmployeeRowProps) {
  return (
    <tr className="border-[1]">
      <td className="w-150px">{rowData.name}</td>
      <td>{rowData.email}</td>
      <td>
        {department.find((d) => d.id === rowData.departmentId)?.name ?? ""}
      </td>
      <td>
        {designation.find((d) => d.id === rowData.designationId)?.name ?? ""}
      </td>
      <td>{rowData.status === "Active" ? "🟢 Active" : "🔴 Inactive"}</td>
      <td>
        <ActionButtons
          setIsModalOpen={setIsModalOpen}
          setSelectedEmployee={setSelectedEmployee}
          rowData={rowData}
        />
      </td>
    </tr>
  );
}
