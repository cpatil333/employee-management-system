import { Designation } from "../types/designation.types";
import { api } from "./api";

export const getDesignations = async () => {
  const response = await api.get("/designations");
  return response.data;
};

export const getDesignation = async (designationId: number) => {
  const response = await api.get(`/designations/${designationId}`);
  return response.data;
};

export const addDesignation = async (designationData: Designation) => {
  const response = await api.post("/designations", designationData);
  return response.data;
};

export const updateDesignation = async (
  designationId: number,
  designationData: Designation,
) => {
  const response = await api.put(
    `/departments/${designationId}`,
    designationData,
  );
  return response.data;
};

export const deleteDesignation = async (departmentId: number) => {
  const response = await api.delete(`/designations/${departmentId}`);
  return response.data;
};
