import { LoginType } from "../types/logintypes";
import { api } from "./api";

export const getUserLogin = async (loginData: LoginType) => {
  const response = await api.post("/login", loginData);
  return response.data;
};
