import { getEmployeeByDepartmentId } from "@/app/services/dashboardApi";
import { EmployeeDashboardTable } from "@/app/types/employeeDashboardTable.types";
import { Employee } from "@/app/types/empoyee.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type DashboardState = {
  departmentEmployees: EmployeeDashboardTable[];
  genderEmployees: Employee[];
  statusEmployees: Employee[];
  recentEmployees: Employee[];
  loading: boolean;
  error: string | null;
  selectedDepartmentTitle: string;
};

const initialState: DashboardState = {
  departmentEmployees: [],
  genderEmployees: [],
  statusEmployees: [],
  recentEmployees: [],
  loading: false,
  error: null,
  selectedDepartmentTitle: "",
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

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDepartmentEmployees: (
      state,
      action: PayloadAction<EmployeeDashboardTable[]>,
    ) => {
      state.departmentEmployees = action.payload;
    },
    setSelectedDepartmentTitle: (state, action: PayloadAction<string>) => {
      state.selectedDepartmentTitle = action.payload;
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
        state.departmentEmployees = action.payload;
      },
    );
    addBuilder.addCase(
      fetchEmployeeByDepartmentId.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      },
    );
  },
});
export const { setDepartmentEmployees, setSelectedDepartmentTitle } =
  DashboardSlice.actions;
export { fetchEmployeeByDepartmentId };
export default DashboardSlice.reducer;
