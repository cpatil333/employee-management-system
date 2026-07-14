"use client";
import { ReactNode, useState } from "react";
import { employeeContext } from "../context/EmployeeContext";
import { Employee } from "../types/empoyee.types";
import { SortField } from "../constant/employee.constants";
import { employees } from "../data/employees";

type EmployeeProviderProps = {
  children: ReactNode;
};

export const EmployeeProvider = ({ children }: EmployeeProviderProps) => {
  const [employeeList, setEmployeeList] = useState<Employee[]>(employees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [selectedDesignation, setSelectedDesignation] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeDetailModal, setEmployeeDetailModal] = useState(false);

  const addEmployee = (data: Employee) => {
    try {
      const employee: Employee = {
        ...data,
        employeeId: Date.now(),

        departmentId: Number(data.departmentId),
        designationId: Number(data.designationId),

        country: Number(data.country),
        state: Number(data.state),
        city: Number(data.city),
      };
      setEmployeeList((prev) => [...prev, employee]);
      setIsModalOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  const updateEmployee = (data: Employee) => {
    if (selectedEmployee) {
      const updatedEmployee: Employee = {
        ...data,
        departmentId: Number(data.departmentId),
        designationId: Number(data.designationId),

        country: Number(data.country),
        state: Number(data.state),
        city: Number(data.city),
      };
      setEmployeeList((prevState) =>
        prevState.map((emp) =>
          emp.employeeId === updatedEmployee.employeeId ? updatedEmployee : emp,
        ),
      );
    }
  };

  const deleteEmployee = (id: number) => {
    setEmployeeList((prev) =>
      prev.filter((emp) => {
        return emp.employeeId !== id;
      }),
    );
    setIsDeleteModalOpen(false);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  return (
    <employeeContext.Provider
      value={{
        employeeList,
        setEmployeeList,

        selectedEmployee,
        setSelectedEmployee,

        isModalOpen,
        setIsModalOpen,

        addEmployee,
        updateEmployee,
        deleteEmployee,
        searchTerm,
        setSearchTerm,
        selectedDepartment,
        setSelectedDepartment,
        selectedDesignation,
        setSelectedDesignation,
        selectedStatus,
        setSelectedStatus,

        sortField,
        setSortField,
        sortOrder,
        setSortOrder,
        handleSort,
        currentPage,
        setCurrentPage,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        employeeDetailModal,
        setEmployeeDetailModal,
      }}
    >
      {children}
    </employeeContext.Provider>
  );
};
