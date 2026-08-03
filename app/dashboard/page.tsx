"use client";

import { useEffect, useMemo } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchEmployees } from "../features/employee/employeeSlice";
import DashboardCard from "../components/ui/DashboardCard";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const employeeList = useAppSelector(
    (state: RootState) => state.employee.employeeList,
  );

  const dashboard = useMemo(() => {
    return [
      { title: "Total Employees", value: employeeList.length },
      {
        title: "Total Departments",
        value: new Set(employeeList.map((e) => e.departmentId)).size,
      },
      {
        title: "Total Designations",
        value: new Set(employeeList.map((e) => e.designationId)).size,
      },
      {
        title: "Active Employees",
        value: employeeList.filter((emp) => emp.status === "Active").length,
      },
      {
        title: "Inactive Employees",
        value: employeeList.filter((emp) => emp.status === "Inactive").length,
      },
    ];
  }, [employeeList]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {dashboard.map((dash) => (
        <DashboardCard key={dash.title} title={dash.title} value={dash.value} />
      ))}
    </div>
  );
}
