import { api } from "./api";

export const getEmployeeByDepartmentId = async (departmentId: number) => {
  // AxiosResponse<Employee[]>
  const response = await api.get(
    `/dashboard/employees/department/${departmentId}`,
  );
  // Employee[]
  return response.data;
};
