"use client";

import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeToolbar from "../components/employee/EmployeeToolbar";
import Pagination from "../components/employee/Pagination";

export default function EmployeePage() {
  return (
    <div>
      <EmployeeToolbar />
      <EmployeeTable />
      <Pagination />
    </div>
  );
}
