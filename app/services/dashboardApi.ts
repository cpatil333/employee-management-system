import { API_ROUTES } from "../constant/api.constants";
import { api } from "./api";

export const getEmployeeByDepartmentId = async (departmentId: number) => {
  // AxiosResponse<Employee[]>
  const response = await api.get(
    `${API_ROUTES.DASHBOARD}/employees/department/${departmentId}`,
  );
  // Employee[]
  return response.data;
};

export const getEmployeeByGender = async (gender: string) => {
  // AxiosResponse<Employee[]>
  const response = await api.get(
    `${API_ROUTES.DASHBOARD}/employees/gender/${gender}`,
  );
  // Employee[]
  return response.data;
};

export const getEmployeeByStatus = async (status: string) => {
  // AxiosResponse<Employee[]>
  const response = await api.get(
    `${API_ROUTES.DASHBOARD}/employees/status/${status}`,
  );
  // Employee[]
  return response.data;
};
