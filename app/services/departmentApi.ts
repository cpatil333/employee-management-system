import { API_ROUTES } from "../constant/api.constants";
import { Department } from "../types/department.types";
import { api } from "./api";

export const getDepartments = async () => {
  const response = await api.get(API_ROUTES.DEPARTMENTS);
  return response.data;
};

export const getDepartment = async (departmentId: number) => {
  const response = await api.get(`${API_ROUTES.DEPARTMENTS}/${departmentId}`);
  return response.data;
};

export const addDepartment = async (departmentData: Department) => {
  const response = await api.post(API_ROUTES.DEPARTMENTS, departmentData);
  return response.data;
};

export const updateDepartment = async (
  departmentId: number,
  departmentData: Department,
) => {
  const response = await api.put(
    `${API_ROUTES.DEPARTMENTS}/${departmentId}`,
    departmentData,
  );
  return response.data;
};

export const deleteDepartment = async (departmentId: number) => {
  const response = await api.delete(
    `${API_ROUTES.DEPARTMENTS}/${departmentId}`,
  );
  return response.data;
};
