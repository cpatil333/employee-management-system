import { api } from "./api";

export const getStates = async (countryId: number) => {
  const response = await api.get(`/states/${countryId}`);
  return response.data;
};
