import { api } from "./api";

export const getCities = async (stateId: number) => {
  const response = await api.get(`/cities/${stateId}`);
  return response.data;
};
