import { API_ROUTES } from "../constant/api.constants";
import { api } from "./api";

export const getCountry = async () => {
  const response = await api.get(API_ROUTES.COUNTRIES);
  return response.data;
};
