import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { AuthApi } from '@/api';
import { UserData } from '../types/auth.types';
import router from '../router';
export const useAuthStore = defineStore('auth', () => {
  const user: Ref<UserData | null> = ref();
  const isAuth = ref(false);
  const isLoading = ref(false);
  async function login(email: string, password: string): Promise<void> {
    const response = await AuthApi.login(email, password).then((response) =>
      response ? response.data : null,
    );
    if (response) {
      localStorage.setItem('token', response.accessToken);
      user.value = response;
      isAuth.value = true;
      router.go(0);
    }
  }
  async function registration(email: string, password: string): Promise<void> {
    const response = await AuthApi.registration(email, password).then(
      (response) => (response ? response.data : null),
    );
    if (response) {
      localStorage.setItem('token', response.accessToken);
      user.value = response;
      isAuth.value = true;
      router.go(0);
    }
  }

  async function logout(): Promise<void> {
    user.value = null;
    isAuth.value = false;
    localStorage.removeItem('token');
    await AuthApi.logout();
  }
  async function checkAuth(): Promise<void> {
    isLoading.value = true;
    try {
      const response = await AuthApi.checkAuth();
      user.value = response;
      isAuth.value = true;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return { user, isAuth, isLoading, login, registration, logout, checkAuth };
});
