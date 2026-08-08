import {
  getEmployeeByDepartmentId,
  getEmployeeByGender,
  getEmployeeByStatus,
} from "@/app/services/dashboardApi";
import { EmployeeDashboardTable } from "@/app/types/employeeDashboardTable.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type DashboardFilter = "" | "department" | "gender" | "status";
type DashboardSelection = {
  filter: DashboardFilter;
  title: string;
};
type DashboardState = {
  selectedEmployees: EmployeeDashboardTable[];
  selectedTitle: string;
  selectedFilter: DashboardFilter;
  loading: boolean;
  error: string | null;
};

const initialState: DashboardState = {
  selectedEmployees: [],
  selectedTitle: "",
  selectedFilter: "",
  loading: false,
  error: null,
};

const fetchEmployeeByDepartmentId = createAsyncThunk(
  "dashboard/fetchEmployeeByDepartmentId",
  async (departmentId: number, { rejectWithValue }) => {
    try {
      // Employee[]
      const employees = await getEmployeeByDepartmentId(departmentId);
      // console.log("API Response:", employees );
      return employees;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

const fetchEmployeeByGender = createAsyncThunk(
  "dashboard/fetchEmployeeByGender",
  async (gender: string, { rejectWithValue }) => {
    try {
      // Employee[]
      const employees = await getEmployeeByGender(gender);
      // console.log("API Response:", employees );
      return employees;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

const fetchEmployeeByStatus = createAsyncThunk(
  "dashboard/fetchEmployeeByStatus",
  async (status: string, { rejectWithValue }) => {
    try {
      // Employee[]
      const employees = await getEmployeeByStatus(status);
      // console.log("API Response:", employees );
      return employees;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    //Selectd Department
    setDashboardSelection: (
      state,
      action: PayloadAction<DashboardSelection>,
    ) => {
      state.selectedFilter = action.payload.filter;
      state.selectedTitle = action.payload.title;
    },
  },
  extraReducers: (addBuilder) => {
    addBuilder.addCase(fetchEmployeeByDepartmentId.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(
      fetchEmployeeByDepartmentId.fulfilled,
      (state, action) => {
        state.loading = false;
        state.selectedEmployees = action.payload;
      },
    );
    addBuilder.addCase(
      fetchEmployeeByDepartmentId.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    );
    //For Gender
    addBuilder.addCase(fetchEmployeeByGender.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchEmployeeByGender.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedEmployees = action.payload;
    });
    addBuilder.addCase(fetchEmployeeByGender.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //For status
    addBuilder.addCase(fetchEmployeeByStatus.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchEmployeeByStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedEmployees = action.payload;
    });
    addBuilder.addCase(fetchEmployeeByStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
export const { setDashboardSelection } = DashboardSlice.actions;
export {
  fetchEmployeeByDepartmentId,
  fetchEmployeeByGender,
  fetchEmployeeByStatus,
};
export default DashboardSlice.reducer;
