import axios, { InternalAxiosRequestConfig } from 'axios';
import AuthApi from './auth.api';
import { AuthResponse } from '@/types/auth.types';

export const API_URL = 'http://localhost:3000/api/';

const api = axios.create({
  withCredentials: true,

  baseURL: API_URL,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      try {
        const response = await axios.get<AuthResponse>(
          `${API_URL}user/refresh`,
          { withCredentials: true },
        );
        localStorage.setItem('token', response.data.accessToken);
        return api.request(originalRequest);
      } catch (Err) {
        console.log(Err);
      }
    } else {
      return Promise.reject(error);
    }
  },
);

export { api, AuthApi };
