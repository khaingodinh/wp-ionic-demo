import { AxiosResponse } from "axios";
import { LoginModel } from "../typings/api/models/LoginModel";
import { api } from "../utils/api";
import { LoginResult } from "../typings/api/results/LoginResult";

const login = async (model: LoginModel): Promise<LoginResult> => {
  const result = await api.post<LoginResult>('/jwt-auth/v1/token', model);
  return result.data;
};

export const authService = {
  login,
}