"use client";
import { useMemo } from "react";
//import { dashboard } from "../data/dashboard";
import { useEmployee } from "../hooks/useEmployee";

export default function DashboardPage() {
  const { employeeList } = useEmployee();
  const dashboard = useMemo(() => {
    return [
      { title: "Total Employees", value: employeeList.length },
      {
        title: "Department",
        value: new Set(employeeList.map((e) => e.departmentId)).size,
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
    <div className="w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6">
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
