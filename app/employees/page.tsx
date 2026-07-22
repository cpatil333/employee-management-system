"use client";

import { useEffect } from "react";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeToolbar from "../components/employee/EmployeeToolbar";
import Pagination from "../components/employee/Pagination";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchEmployees } from "../features/employee/employeeSlice";

export default function EmployeePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      <EmployeeToolbar />
      <EmployeeTable />
      <Pagination />
    </div>
  );
}
