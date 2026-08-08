import { PAGE_SIZE } from "@/app/constant/common.constants";
import { RootState } from "@/app/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectDesignationState = (state: RootState) => state.designation;

export const selectFilteredDesignation = createSelector(
  [selectDesignationState],
  (designationState) => {
    const { searchTerm, designationList } = designationState;

    return designationList.filter((desg) => {
      const matchSearchTerm = desg.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchSearchTerm;
    });
  },
);

export const selectSortedDesignations = createSelector(
  [selectFilteredDesignation, selectDesignationState],
  (filteredDesignation, designationState) => {
    const sorted = [...filteredDesignation];

    sorted.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);

      return designationState.sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  },
);

export const selectPaginatedDesignation = createSelector(
  [selectSortedDesignations, selectDesignationState],
  (sortedDesignations, designationState) => {
    const { currentPage, perPage } = designationState;

    const startIndex = (currentPage - 1) * PAGE_SIZE.DESIGNATIONS;
    return sortedDesignations.slice(startIndex, startIndex + perPage);
  },
);

export const selectTotalPages = createSelector(
  [selectSortedDesignations, selectDesignationState],
  (filteredDesignation, designationState) => {
    return Math.ceil(filteredDesignation.length / designationState.perPage);
  },
);
