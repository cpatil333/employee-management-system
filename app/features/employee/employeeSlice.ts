import { Employee } from "@/app/types/empoyee.types";
import { createSlice } from "@reduxjs/toolkit";
import { employees } from "@/app/data/employees";
import { SortField } from "../../constant/employee.constants";
import { State } from "@/app/types/state.types";
import { City } from "@/app/types/city.types";
import { states } from "@/app/data/states";
import { cities } from "@/app/data/cities";

type EmployeeState = {
  employeeList: Employee[];
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
  selectFilteredStates: State[] | null;
  selectFilteredCities: City[] | null;
  employeeDetailModal: boolean;
  isDeleteModalOpen: boolean;
};

const initialState: EmployeeState = {
  employeeList: employees,
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
  selectFilteredStates: null,
  selectFilteredCities: null,
  employeeDetailModal: false,
  isDeleteModalOpen: false,
};

export const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployees(state) {
      state.employeeList = employees;
    },
    setSelectedEmployee(state, action) {
      state.selectedEmployee =
        employees.find((emp) => emp.employeeId == action.payload) ?? null;
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    nextPage(state) {
      state.currentPage++;
    },
    previousPage(state) {
      state.currentPage--;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    addEmployee(state, action) {
      const employee: Employee = {
        ...action.payload,
        employeeId: Date.now(),
        departmentId: Number(action.payload.departmentId),
        designationId: Number(action.payload.designationId),

        country: Number(action.payload.country),
        state: Number(action.payload.state),
        city: Number(action.payload.city),
      };
      state.employeeList.push(employee);
    },
    updateEmployee(state, action) {
      state.employeeList = state.employeeList.map((emp) =>
        emp.employeeId === action.payload.employeeId
          ? {
              ...action.payload,

              departmentId: Number(action.payload.departmentId),
              designationId: Number(action.payload.designationId),

              country: Number(action.payload.country),
              state: Number(action.payload.state),
              city: Number(action.payload.city),
            }
          : emp,
      );
    },
    deleteEmployee(state, action) {
      state.employeeList = state.employeeList.filter(
        (emp) => emp.employeeId !== action.payload,
      );
    },
    setSelectedCountry(state, action) {
      state.selectFilteredStates = states.filter(
        (state) => state.countryId === Number(action.payload),
      );
    },
    setSelectedState(state, action) {
      state.selectFilteredCities = cities.filter(
        (state) => state.stateId === Number(action.payload),
      );
    },
    setEmployeeDetailModal(state, action) {
      state.employeeDetailModal = action.payload;
    },
    setIsDeleteModalOpen(state, action) {
      state.isDeleteModalOpen = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setSelectedEmployee,
  setEmployees,
  nextPage,
  previousPage,
  setSearchTerm,
  setSelectedDepartment,
  setSelectedDesignation,
  setSelectedStatus,
  setIsModalOpen,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  setSelectedCountry,
  setSelectedState,
  setEmployeeDetailModal,
  setIsDeleteModalOpen,
} = EmployeeSlice.actions;
export default EmployeeSlice.reducer;
