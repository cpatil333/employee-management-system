import { api } from "../services/api";

export const getEmployees = async () => {
  const response = await api.get("/employees");
  return response.data;
};

export const getEmployeeById = async (employeeId: number) => {
  const response = await api.get(`/employees/${employeeId}`);
  console.log(response.data);
  return response.data;
};

export const createEmployee = async (formData: FormData) => {
  const response = await api.post("/employees", formData);
  return response.data;
};

export const updateEmployee = async (
  employeeId: number,
  formData: FormData,
) => {
  const response = await api.put(`/employees/${employeeId}`, formData);
  return response.data;
};

export const deleteEmployee = async (employeeId: number) => {
  const response = await api.delete(`/employees/${employeeId}`);
  return response.data;
};
