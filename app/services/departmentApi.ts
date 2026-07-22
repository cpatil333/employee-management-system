import { api } from "./api";

export const getDepartment = async () => {
  const response = await api.get("/departments");
  return response.data;
};
