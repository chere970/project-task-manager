import { apiClient } from './client';
import type { LoginResponse, RegisterResponse, User } from '@/types';

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    return apiClient.post<LoginResponse>('/users/login/', { email, password });
  },

  register: async (data: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password2: string;
  }): Promise<RegisterResponse> => {
    return apiClient.post<RegisterResponse>('/users/register/', data);
  },

  getCurrentUser: async (): Promise<User> => {
    // This would need a /users/me/ endpoint on backend
    // For now, we'll get user from localStorage
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (userStr) {
      return JSON.parse(userStr);
    }
    throw new Error('No user found');
  },
};





