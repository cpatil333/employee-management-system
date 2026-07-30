"use client";

import { useEffect,} from "react";
import EmployeeTable from "../components/employee/EmployeeTableHeader";
import EmployeeToolbar from "../components/employee/EmployeeToolbar";
import Pagination from "../components/employee/EmployeePagination";
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
