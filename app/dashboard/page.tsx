"use client";

import { useEffect, useMemo } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchEmployees } from "../features/employee/employeeSlice";
import DashboardCard from "../components/ui/DashboardCard";
import { STATUS } from "../constant/status.constants";
import DepartmentChart from "../components/dashboard/DepartmentChart";
import GenderChart from "../components/dashboard/GenderChart";
import {
  selectEmployeesByDepartment,
  selectEmployeesByGender,
  selectEmployeeStatusSummary,
  selectRecentEmployees,
} from "../features/employee/employeeSelectors";
import ChartCard from "../components/ui/ChartCard";
import RecentEmployees from "../components/dashboard/RecentEmployeesTable";
import StatusChart from "../components/dashboard/EmployeeStatusChart";
import DashboardEmployeeTable from "../components/dashboard/DashboardEmployeeTable";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  const departmentData = useAppSelector(selectEmployeesByDepartment);
  const genderData = useAppSelector(selectEmployeesByGender);
  const recentJoinEmployesData = useAppSelector(selectRecentEmployees);
  const statusData = useAppSelector(selectEmployeeStatusSummary);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const employeeList = useAppSelector(
    (state: RootState) => state.employee.employeeList,
  );

  const setDepartmentEmployees = useAppSelector(
    (state) => state.dashboard.departmentEmployees,
  );

  const DepartmentTitle = useAppSelector(
    (state) => state.dashboard.selectedDepartmentTitle,
  );

  console.log(setDepartmentEmployees);

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
        value: employeeList.filter((emp) => emp.status === STATUS.ACTIVE)
          .length,
      },
      {
        title: "Inactive Employees",
        value: employeeList.filter((emp) => emp.status === STATUS.INACTIVE)
          .length,
      },
    ];
  }, [employeeList]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
        {dashboard.map((dash) => (
          <DashboardCard
            key={dash.title}
            title={dash.title}
            value={dash.value}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="📊 Employees by Department">
          <DepartmentChart
            chartData={departmentData}
            loading={false}
            hasError={false}
          />
        </ChartCard>
        <ChartCard title="👥 Employees by Gender">
          <GenderChart
            chartData={genderData}
            loading={false}
            hasError={false}
          />
        </ChartCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="🟢 Employees by Status">
          <StatusChart
            chartData={statusData}
            loading={false}
            hasError={false}
          />
        </ChartCard>
        <ChartCard title="🕒 Employees by Recently Joined">
          <RecentEmployees
            Data={recentJoinEmployesData}
            loading={false}
            hasError={false}
          />
        </ChartCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <DashboardEmployeeTable
          tableData={setDepartmentEmployees}
          title={DepartmentTitle}
          loading={false}
          hasError={false}
        />
      </div>
    </>
  );
}
