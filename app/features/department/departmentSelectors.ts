import { RootState } from "@/app/store/store";

export const selectFilteredDepartment = (state: RootState) => {
  const { searchTerm, departmentList } = state.department;

  return departmentList.filter((dept) => {
    const matchSearchTerm = dept.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchSearchTerm;
  });
};

export const selectPaginatedDepartments = (state: RootState) => {
  const { currentPage, perPage } = state.department;
  const sortedDepatments = selectFilteredDepartment(state);

  const startIndex = (currentPage - 1) * perPage;
  return sortedDepatments.slice(startIndex, startIndex + perPage);
};

export const selectTotalPages = (state: RootState) => {
  const filtered = selectFilteredDepartment(state);

  return Math.ceil(filtered.length / state.department.perPage);
};
