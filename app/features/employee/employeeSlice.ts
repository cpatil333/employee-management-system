import { Employee } from "@/app/types/empoyee.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortField } from "../../constant/employee.constants";

import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "@/app/services/employeeApi";
import { getDepartments } from "@/app/services/departmentApi";
import { Department } from "@/app/types/department.types";
import { Designation } from "@/app/types/designation.types";
import { getDesignations } from "@/app/services/designationApi";
import axios from "axios";

type EmployeeState = {
  employeeList: Employee[];
  employee: Employee | null;
  departmentList: Department[];
  designationList: Designation[];
  selectedEmployee: Employee | null;
  searchTerm: string;
  selectedDepartment: number;
  selectedDesignation: number;
  selectedStatus: string;
  sortField: SortField;
  sortOrder: "asc" | "desc";
  perPage: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  selectedCountry: number;
  selectedState: number;
  selectedCity: number;
  employeeDetailModal: boolean;
  isDeleteModalOpen: boolean;
};

const initialState: EmployeeState = {
  employeeList: [],
  employee: null,
  departmentList: [],
  designationList: [],
  selectedEmployee: null,
  searchTerm: "",
  selectedDepartment: 0,
  selectedDesignation: 0,
  selectedStatus: "",
  sortField: "name",
  sortOrder: "asc",
  perPage: 5,
  currentPage: 1,
  loading: false,
  error: null,
  isModalOpen: false,
  selectedCountry: 0,
  selectedState: 0,
  selectedCity: 0,
  employeeDetailModal: false,
  isDeleteModalOpen: false,
};

type UpdateEmployeePayLoad = {
  employeeId: number;
  formData: FormData;
};

const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getEmployees();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ?? error.message,
          );
        }
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

const fetchEmployeeById = createAsyncThunk(
  "employee/fetchEmployeeById",
  async (employeeId: number, { rejectWithValue }) => {
    try {
      const data = await getEmployeeById(employeeId);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

const addEmployeeAsync = createAsyncThunk(
  "employee/addEmployeeAsync",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const data = await createEmployee(formData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

const updateEmployeeAsync = createAsyncThunk(
  "employee/updateEmployeeAsync",
  async (
    { employeeId, formData }: UpdateEmployeePayLoad,
    { rejectWithValue },
  ) => {
    try {
      const data = await updateEmployee(employeeId, formData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

const deleteEmployeeAsync = createAsyncThunk(
  "employee/deleteEmployeeAsync",
  async (employeeId: number, { rejectWithValue }) => {
    try {
      const data = await deleteEmployee(employeeId);
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

export const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setSelectedEmployee(state, action: PayloadAction<Employee | null>) {
      state.selectedEmployee = action.payload;
    },

    setSelectedDepartment(state, action) {
      state.selectedDepartment = action.payload;
      state.currentPage = 1;
    },

    setSelectedDesignation(state, action) {
      state.selectedDesignation = action.payload;
      state.currentPage = 1;
    },

    setSelectedStatus(state, action) {
      state.selectedStatus = action.payload;
      state.currentPage = 1;
    },

    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },

    setEmployeeDetailModal(state, action: PayloadAction<boolean>) {
      state.employeeDetailModal = action.payload;
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
    setSort(
      state,
      action: PayloadAction<{
        field: SortField;
        order: "asc" | "desc";
      }>,
    ) {
      state.sortField = action.payload.field;
      state.sortOrder = action.payload.order;
    },
  },

  extraReducers(addBuilder) {
    addBuilder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employeeList = action.payload;
    });
    addBuilder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    //fetch employee by Id
    addBuilder.addCase(fetchEmployeeById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchEmployeeById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedEmployee = action.payload;
    });
    addBuilder.addCase(fetchEmployeeById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //Inert new employee
    addBuilder.addCase(addEmployeeAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    addBuilder.addCase(
      addEmployeeAsync.fulfilled,
      (state, action: PayloadAction<Employee>) => {
        state.loading = false;
        state.employeeList.unshift(action.payload);
      },
    );
    addBuilder.addCase(addEmployeeAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //update existing employee
    addBuilder.addCase(updateEmployeeAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    addBuilder.addCase(
      updateEmployeeAsync.fulfilled,
      (state, action: PayloadAction<Employee>) => {
        state.loading = false;

        const index = state.employeeList.findIndex(
          (emp) => emp.employeeId === action.payload.employeeId,
        );

        if (index != -1) {
          state.employeeList[index] = action.payload;
        }
      },
    );
    addBuilder.addCase(updateEmployeeAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //delete existing employee
    addBuilder.addCase(deleteEmployeeAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.employeeList = state.employeeList.filter(
        (emp) => emp.employeeId !== action.payload.employeeId,
      );
    });
    addBuilder.addCase(deleteEmployeeAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  setCurrentPage,
  setSelectedEmployee,
  nextPage,
  previousPage,
  setSearchTerm,
  setIsModalOpen,
  setEmployeeDetailModal,
  setIsDeleteModalOpen,
  setSelectedDepartment,
  setSelectedDesignation,
  setSelectedStatus,
  setSort,
} = EmployeeSlice.actions;
export {
  fetchEmployees,
  fetchEmployeeById,
  fetchDepartments,
  fetchDesignations,
  addEmployeeAsync,
  updateEmployeeAsync,
  deleteEmployeeAsync,
};
export default EmployeeSlice.reducer;
