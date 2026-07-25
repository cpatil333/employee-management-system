import {
  addDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
  updateDepartment,
} from "@/app/services/departmentApi";
import { Department } from "@/app/types/department.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type updateDepartmentPayLoad = {
  departmentId: number;
  departmentData: Department;
};
type DepartmentState = {
  departmentList: Department[];
  selectedDepartment: Department | null;
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isDetailModalOpen: boolean;
  searchTerm: string;
  departmentDetailModal: boolean;
  isDeleteModalOpen: boolean;
  currentPage: number;
  perPage: number;
};
const initialState: DepartmentState = {
  departmentList: [],
  selectedDepartment: null,
  loading: false,
  error: null,
  isModalOpen: false,
  isDetailModalOpen: false,
  searchTerm: "",
  departmentDetailModal: false,
  isDeleteModalOpen: false,
  currentPage: 1,
  perPage: 5,
};

const fetchDepartments = createAsyncThunk(
  "department/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const data = getDepartments();
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

const fetchDepartmentById = createAsyncThunk(
  "department/fetchDepartmentById",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = getDepartment(id);
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

const addDepartmentAsync = createAsyncThunk(
  "department/addDepartmentAsync",
  async (department: Department, { rejectWithValue }) => {
    try {
      const data = addDepartment(department);
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

const updateDepartmentAsync = createAsyncThunk(
  "department/updateDepartmentAsync",
  async (
    { departmentId, departmentData }: updateDepartmentPayLoad,
    { rejectWithValue },
  ) => {
    try {
      const data = updateDepartment(departmentId, departmentData);
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

const deleteDepartmentAsync = createAsyncThunk(
  "department/deleteDepartmentAsync",
  async (departmentId: number, { rejectWithValue }) => {
    try {
      const data = deleteDepartment(departmentId);
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

export const DepartmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },

    setSelectedDepartment(state, action: PayloadAction<Department | null>) {
      state.selectedDepartment = action.payload;
    },

    setDepartmentDetailModal(state, action: PayloadAction<boolean>) {
      state.departmentDetailModal = action.payload;
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
  },
  extraReducers(addBuilder) {
    addBuilder.addCase(fetchDepartments.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.loading = false;
      state.departmentList = action.payload;
    });
    addBuilder.addCase(fetchDepartments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //get single deparment
    addBuilder.addCase(fetchDepartmentById.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchDepartmentById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedDepartment = action.payload;
    });
    addBuilder.addCase(fetchDepartmentById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //addDepartmentAsync
    addBuilder.addCase(addDepartmentAsync.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(addDepartmentAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.departmentList.unshift(action.payload);
    });
    addBuilder.addCase(addDepartmentAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //updateDepartmentAsync
    addBuilder.addCase(updateDepartmentAsync.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(updateDepartmentAsync.fulfilled, (state, action) => {
      state.loading = false;

      const index = state.departmentList.findIndex(
        (dept) => dept.id === action.payload.id,
      );

      if (index !== -1) {
        state.departmentList[index] = action.payload;
      }
    });
    addBuilder.addCase(updateDepartmentAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    /// //deleteDepartmentAsync
    addBuilder.addCase(deleteDepartmentAsync.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(deleteDepartmentAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.departmentList = state.departmentList.filter(
        (dept) => dept.id !== action.payload.id,
      );
    });
    addBuilder.addCase(deleteDepartmentAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  setSearchTerm,
  setDepartmentDetailModal,
  setCurrentPage,
  nextPage,
  previousPage,
  setIsModalOpen,
  setIsDeleteModalOpen,
} = DepartmentSlice.actions;
export {
  fetchDepartments,
  fetchDepartmentById,
  deleteDepartmentAsync,
  addDepartmentAsync,
  updateDepartmentAsync,
};
export default DepartmentSlice.reducer;
