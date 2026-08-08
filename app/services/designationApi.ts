import { API_ROUTES } from "../constant/api.constants";
import { Designation } from "../types/designation.types";
import { api } from "./api";

export const getDesignations = async () => {
  const response = await api.get(API_ROUTES.DESIGNATIONS);
  return response.data;
};

export const getDesignation = async (designationId: number) => {
  const response = await api.get(`${API_ROUTES.DESIGNATIONS}/${designationId}`);
  return response.data;
};

export const addDesignation = async (designationData: Designation) => {
  const response = await api.post(API_ROUTES.DESIGNATIONS, designationData);
  return response.data;
};

export const updateDesignation = async (
  designationId: number,
  designationData: Designation,
) => {
  const response = await api.put(
    `${API_ROUTES.DESIGNATIONS}/${designationId}`,
    designationData,
  );
  return response.data;
};

export const deleteDesignation = async (designationId: number) => {
  const response = await api.delete(
    `${API_ROUTES.DESIGNATIONS}/${designationId}`,
  );
  return response.data;
};
