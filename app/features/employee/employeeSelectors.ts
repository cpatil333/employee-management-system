import { RootState } from "@/app/store/store";
import { Employee } from "@/app/types/empoyee.types";
import { createSelector } from "@reduxjs/toolkit";

export const selectEmployeeState = (state: RootState) => state.employee;
export const selectDepartmentState = (state: RootState) => state.department;
export const selectDesignatonState = (state: RootState) => state.designation;

export type EmployeeView = Employee & {
  departmentName: string;
  designationName: string;
};

export const selectFilteredEmployees = createSelector(
  [selectEmployeeState],
  (employeeState) => {
    const {
      searchTerm,
      selectedDepartment,
      selectedDesignation,
      selectedStatus,
      employeeList,
    } = employeeState;

    return employeeList.filter((emp) => {
      const matchSearchTerm =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchDepartment =
        selectedDepartment === 0 || emp.departmentId === selectedDepartment;

      const matchDesignation =
        selectedDesignation === 0 || emp.designationId === selectedDesignation;

      const matchStatus =
        selectedStatus === "" ||
        emp.status.toLowerCase() === selectedStatus.toLowerCase();

      return (
        matchSearchTerm && matchDepartment && matchDesignation && matchStatus
      );
    });
  },
);

export const selectEmployeeWithNames = createSelector(
  [selectFilteredEmployees, selectDepartmentState, selectDesignatonState],
  (employees, departmentState, designationState): EmployeeView[] => {
    return employees.map((emp) => ({
      ...emp,

      departmentName:
        departmentState.departmentList.find((d) => d.id === emp.departmentId)
          ?.name ?? "",

      designationName:
        designationState.designationList.find((d) => d.id === emp.designationId)
          ?.name ?? "",
    }));
  },
);

// Sort selector
export const selectSortedEmployees = createSelector(
  [selectEmployeeWithNames, selectEmployeeState],
  (employees, employeeState) => {
    const { sortField, sortOrder } = employeeState;

    const sorted = [...employees];

    const sortFunctions = {
      name: (e: EmployeeView) => e.name,
      email: (e: EmployeeView) => e.email,
      department: (e: EmployeeView) => e.departmentName,
      designation: (e: EmployeeView) => e.designationName,
      status: (e: EmployeeView) => e.status,
    };

    sorted.sort((a, b) => {
      const comparison = sortFunctions[sortField](a).localeCompare(
        sortFunctions[sortField](b),
      );

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  },
);

// Pagination selector
export const selectPaginatedEmployees = createSelector(
  [selectSortedEmployees, selectEmployeeState],
  (sortedEmployees, employeeState) => {
    const { currentPage, perPage } = employeeState;

    const startIndex = (currentPage - 1) * perPage;

    return sortedEmployees.slice(startIndex, startIndex + perPage);
  },
);

export const selectTotalPages = createSelector(
  [selectFilteredEmployees, selectEmployeeState],
  (filteredEmployees, employeeState) => {
    return Math.ceil(filteredEmployees.length / employeeState.perPage);
  },
);

//for charts
export const selectEmployeesByDepartment = createSelector(
  [selectEmployeeState, selectDepartmentState],
  (employeeState, departmentState) => {
    return departmentState.departmentList.map((dept) => ({
      department: dept.name,
      count: employeeState.employeeList.filter(
        (emp) => emp.departmentId === dept.id,
      ).length,
    }));
  },
);

export const selectEmployeesByGender = createSelector(
  [selectEmployeeState],
  (employeeState) => [
    {
      gender: "Male",
      count: employeeState.employeeList.filter((emp) => emp.gender === "Male")
        .length,
    },
    {
      gender: "Female",
      count: employeeState.employeeList.filter((emp) => emp.gender === "Female")
        .length,
    },
  ],
);

export const selectEmployeeStatusSummary = createSelector(
  [selectEmployeeState],
  (employeeState) => [
    {
      status: "Active",
      count: employeeState.employeeList.filter((emp) => emp.status === "Active")
        .length,
    },
    {
      status: "Inactive",
      count: employeeState.employeeList.filter(
        (emp) => emp.status === "Inactive",
      ).length,
    },
  ],
);

export const selectRecentEmployees = createSelector(
  [selectEmployeeState],
  (employeeState) => {
    return [...employeeState.employeeList].sort(
      (a, b) =>
        new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime(),
    );
  },
);
