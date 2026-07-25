import { RootState } from "@/app/store/store";

export const selectFilteredDesignation = (state: RootState) => {
  const { searchTerm, designationList } = state.designation;

  return designationList.filter((desg) => {
    const matchSearchTerm = desg.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchSearchTerm;
  });
};

export const selectPaginatedDepartments = (state: RootState) => {
  const { currentPage, perPage } = state.designation;
  const sortedDesignations = selectFilteredDesignation(state);

  const startIndex = (currentPage - 1) * perPage;
  return sortedDesignations.slice(startIndex, startIndex + perPage);
};

export const selectTotalPages = (state: RootState) => {
  const filtered = selectFilteredDesignation(state);

  return Math.ceil(filtered.length / state.designation.perPage);
};
