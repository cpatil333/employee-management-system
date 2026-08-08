import { API_ROUTES } from "../constant/api.constants";
import { LoginType } from "../types/authTypes";
import { api } from "./api";

export const getUserLogin = async (loginData: LoginType) => {
  const response = await api.post(API_ROUTES.LOGIN, loginData);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post(`${API_ROUTES.LOGIN}/forgot-password`, {
    email,
  });
  return response.data;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await api.post(`${API_ROUTES.LOGIN}/reset-password`, {
    token,
    password,
  });
  return response.data;
};
