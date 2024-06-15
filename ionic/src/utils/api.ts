import axios, { InternalAxiosRequestConfig } from 'axios';
import { getSnapshot, setSession } from '../utils/sessionStore';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const session = getSnapshot();
  if (session?.accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      setSession(null);
    }
    return Promise.reject(error);
  }
);

export { api };