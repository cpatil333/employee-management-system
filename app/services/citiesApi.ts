import { API_ROUTES } from "../constant/api.constants";
import { api } from "./api";

export const getCities = async (stateId: number) => {
  const response = await api.get(`${API_ROUTES.CITIES}/${stateId}`);
  return response.data;
};
