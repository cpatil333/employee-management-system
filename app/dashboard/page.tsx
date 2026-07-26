"use client";

import { useEffect, useMemo } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchEmployees } from "../features/employee/employeeSlice";

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
    <div className="w-5xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6">
      {dashboard.map((dash) => (
        <Cards
          key={dash.title}
          title={dash.title}
          value={dash.value.toString()}
        />
      ))}
    </div>
  );
}

type CardsProps = {
  title: string;
  value: string;
};

function Cards({ title, value }: CardsProps) {
  return (
    <div key={title}>
      <div className="text-center justify-center bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-t-4 border-blue-600">
        <p className="text-gray-500 text-sm font-semibold">{title}</p>
        <p className="text-4xl text-black font-bold">{value}</p>
      </div>
    </div>
  );
}
