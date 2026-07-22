import { api } from "./api";

export const getDesignation = async () => {
  const response = await api.get("/designations");
  return response.data;
};
