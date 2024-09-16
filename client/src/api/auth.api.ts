import axios, { AxiosResponse } from 'axios';
import { api } from '.';
import { AuthResponse } from '@/types/auth.types';

export default class AuthApi {
  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse> | void> {
    return api.post('/user/login', { email, password });
  }

  static async registration(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse> | void> {
    return api.post('/user/registration', { email, password });
  }

  static async logout(): Promise<void> {
    try {
      api.get('/user/logout');
    } catch (e) {
      console.log(e);
    }
  }
  static async checkAuth(): Promise<AuthResponse> {
    return api.get('/user/checkAuth').then((response) => response.data);
  }
}
