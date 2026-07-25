import { Department } from "../types/department.types";
import { api } from "./api";

export const getDepartments = async () => {
  const response = await api.get("/departments");
  return response.data;
};

export const getDepartment = async (departmentId: number) => {
  const response = await api.get(`/departments/${departmentId}`);
  return response.data;
};

export const addDepartment = async (departmentData: Department) => {
  const response = await api.post("/departments", departmentData);
  return response.data;
};

export const updateDepartment = async (
  departmentId: number,
  departmentData: Department,
) => {
  const response = await api.put(
    `/departments/${departmentId}`,
    departmentData,
  );
  return response.data;
};

export const deleteDepartment = async (departmentId: number) => {
  const response = await api.delete(`/departments/${departmentId}`);
  return response.data;
};
