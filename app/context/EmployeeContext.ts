import React, { createContext } from "react";
import type { Employee } from "../types/empoyee.types";
import { SortField } from "../constant/employee.constants";

type employeeContextType = {
  employeeList: Employee[];
  setEmployeeList: React.Dispatch<React.SetStateAction<Employee[]>>;
  selectedEmployee: Employee | null;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: number) => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedDepartment: number;
  setSelectedDepartment: React.Dispatch<React.SetStateAction<number>>;
  selectedDesignation: number;
  setSelectedDesignation: React.Dispatch<React.SetStateAction<number>>;
  selectedStatus: string;
  setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
  sortField: string;
  setSortField: React.Dispatch<React.SetStateAction<SortField>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  handleSort: (field: SortField) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  employeeDetailModal: boolean;
  setEmployeeDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const employeeContext = createContext<employeeContextType | null>(null);
