import { RootState } from "@/app/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectDepartmentState = (state: RootState) => state.department;

export const selectFilteredDepartment = createSelector(
  [selectDepartmentState],
  (departmentState) => {
    const { searchTerm, departmentList } = departmentState;

    return departmentList.filter((dept) => {
      const matchSearchTerm = dept.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchSearchTerm;
    });
  },
);

export const selectSortedDepartments = createSelector(
  [selectFilteredDepartment, selectDepartmentState],
  (filteredDepartment, departmentState) => {
    const sorted = [...filteredDepartment];

    sorted.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);

      return departmentState.sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  },
);

export const selectPaginatedDepartments = createSelector(
  [selectSortedDepartments, selectDepartmentState],
  (sortedDepatments, departmentState) => {
    const { currentPage, perPage } = departmentState;

    const startIndex = (currentPage - 1) * perPage;
    return sortedDepatments.slice(startIndex, startIndex + perPage);
  },
);

export const selectTotalPages = createSelector(
  [selectSortedDepartments, selectDepartmentState],
  (filteredDepartment, departmentState) => {
    return Math.ceil(filteredDepartment.length / departmentState.perPage);
  },
);
