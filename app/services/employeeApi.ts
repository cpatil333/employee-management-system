import { API_ROUTES } from "../constant/api.constants";
import { api } from "../services/api";

export const getEmployees = async () => {
  const response = await api.get(API_ROUTES.EMPLOYEES);
  return response.data;
};

export const getEmployeeById = async (employeeId: number) => {
  const response = await api.get(`${API_ROUTES.EMPLOYEES}/${employeeId}`);
  console.log(response.data);
  return response.data;
};

export const createEmployee = async (formData: FormData) => {
  const response = await api.post(API_ROUTES.EMPLOYEES, formData);
  return response.data;
};

export const updateEmployee = async (
  employeeId: number,
  formData: FormData,
) => {
  const response = await api.put(
    `${API_ROUTES.EMPLOYEES}/${employeeId}`,
    formData,
  );
  return response.data;
};

export const deleteEmployee = async (employeeId: number) => {
  const response = await api.delete(`{API_ROUTES.EMPLOYEES}/${employeeId}`);
  return response.data;
};
