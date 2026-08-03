import {
  addDesignation,
  deleteDesignation,
  getDesignation,
  getDesignations,
  updateDesignation,
} from "@/app/services/designationApi";
import { Designation } from "@/app/types/designation.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type updateDesignationPayLoad = {
  designationId: number;
  designationData: Designation;
};
type DesignationState = {
  designationList: Designation[];
  selectedDesignation: Designation | null;
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isDetailModalOpen: boolean;
  searchTerm: string;
  designationDetailModal: boolean;
  isDeleteModalOpen: boolean;
  currentPage: number;
  perPage: number;
  sortField: "name";
  sortOrder: "asc" | "desc";
};
const initialState: DesignationState = {
  designationList: [],
  selectedDesignation: null,
  loading: false,
  error: null,
  isModalOpen: false,
  isDetailModalOpen: false,
  searchTerm: "",
  designationDetailModal: false,
  isDeleteModalOpen: false,
  currentPage: 1,
  perPage: 5,
  sortField: "name",
  sortOrder: "asc",
};

const fetchDesignations = createAsyncThunk(
  "department/fetchDesignations",
  async (_, { rejectWithValue }) => {
    try {
      const data = getDesignations();
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

const fetchDesignationById = createAsyncThunk(
  "department/fetchDesignationById",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = getDesignation(id);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

const addDesignationAsync = createAsyncThunk(
  "department/addDesignationAsync",
  async (designation: Designation, { rejectWithValue }) => {
    try {
      const data = addDesignation(designation);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

const updateDesignationAsync = createAsyncThunk(
  "department/updateDesignationAsync",
  async (
    { designationId, designationData }: updateDesignationPayLoad,
    { rejectWithValue },
  ) => {
    try {
      const data = updateDesignation(designationId, designationData);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

const deleteDesignationAsync = createAsyncThunk(
  "department/deleteDesignationAsync",
  async (desinationId: number, { rejectWithValue }) => {
    try {
      const data = deleteDesignation(desinationId);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

export const DesignationSlice = createSlice({
  name: "designation",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },

    setSelectedDesignation(state, action: PayloadAction<Designation | null>) {
      state.selectedDesignation = action.payload;
    },

    setDesignationDetailModal(state, action: PayloadAction<boolean>) {
      state.designationDetailModal = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    nextPage(state) {
      state.currentPage++;
    },

    previousPage(state) {
      state.currentPage--;
    },

    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },

    setIsDeleteModalOpen(state, action: PayloadAction<boolean>) {
      state.isDeleteModalOpen = action.payload;
    },
    setSort: (
      state,
      action: PayloadAction<{
        field: "name";
        order: "asc" | "desc";
      }>,
    ) => {
      state.sortField = action.payload.field;
      state.sortOrder = action.payload.order;
    },
  },
  extraReducers(addBuilder) {
    addBuilder.addCase(fetchDesignations.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchDesignations.fulfilled, (state, action) => {
      state.loading = false;
      state.designationList = action.payload;
    });
    addBuilder.addCase(fetchDesignations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //get single deparment
    addBuilder.addCase(fetchDesignationById.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchDesignationById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedDesignation = action.payload;
    });
    addBuilder.addCase(fetchDesignationById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //addDepartmentAsync
    addBuilder.addCase(addDesignationAsync.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(addDesignationAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.designationList.unshift(action.payload);
    });
    addBuilder.addCase(addDesignationAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //updateDepartmentAsync
    addBuilder.addCase(updateDesignationAsync.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(updateDesignationAsync.fulfilled, (state, action) => {
      state.loading = false;

      const index = state.designationList.findIndex(
        (dept) => dept.id === action.payload.id,
      );

      if (index !== -1) {
        state.designationList[index] = action.payload;
      }
    });
    addBuilder.addCase(updateDesignationAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /// //deleteDepartmentAsync
    addBuilder.addCase(deleteDesignationAsync.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(deleteDesignationAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.designationList = state.designationList.filter(
        (dept) => dept.id !== action.payload.id,
      );
    });
    addBuilder.addCase(deleteDesignationAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  setSearchTerm,
  setDesignationDetailModal,
  setCurrentPage,
  nextPage,
  previousPage,
  setIsModalOpen,
  setIsDeleteModalOpen,
  setSort,
} = DesignationSlice.actions;
export {
  fetchDesignations,
  fetchDesignationById,
  deleteDesignationAsync,
  addDesignationAsync,
  updateDesignationAsync,
};
export default DesignationSlice.reducer;
