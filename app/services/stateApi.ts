import { API_ROUTES } from "../constant/api.constants";
import { api } from "./api";

export const getStates = async (countryId: number) => {
  const response = await api.get(`${API_ROUTES.STATES}/${countryId}`);
  return response.data;
};
