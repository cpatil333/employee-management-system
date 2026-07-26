"use client";

import DashboardPage from "../dashboard/page";
import DepartmentPage from "../department/DepartmentPage";
import DesignationPage from "../designation/DesignationPage";
import EmployeePage from "../employees/page";
import { useAppSelector } from "../hooks/useAppSelector";
import Sidebar from "../sidebar/Sidebar";

export default function page() {
  const activeMenu = useAppSelector((state) => state.ui.activeMenu);

  const pages = {
    Dashboard: <DashboardPage />,
    Employees: <EmployeePage />,
    Departments: <DepartmentPage />,
    Designations: <DesignationPage />,
  };

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">{pages[activeMenu]}</main>
    </div>
  );
}
