import { api } from "./api";

export const getCountry = async () => {
  const response = await api.get("/countries");
  return response.data;
};
