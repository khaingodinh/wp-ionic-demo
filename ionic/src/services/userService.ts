import { UserModel } from "../typings/api/models/UserModel";
import { UserResult } from "../typings/api/results/UserResult";
import { api } from "../utils/api"

const getUsers = async (): Promise<UserResult[]> => {
  const result = await api.get<UserResult[]>('/wp/v2/users?context=edit');
  return result.data;
}

const getUserById = async (id: string): Promise<UserResult> => {
  const result = await api.get<UserResult>('/wp/v2/users/' + id + '?context=edit');
  return result.data;
}

const createUser = async (model: UserModel): Promise<UserResult> => {
  const result = await api.post<UserResult>('/wp/v2/users', model);
  return result.data;
}

export const userService = {
  getUsers,
  getUserById,
  createUser,
}