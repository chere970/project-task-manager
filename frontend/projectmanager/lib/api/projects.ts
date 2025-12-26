import { apiClient } from './client';
import type { Project, Task } from '@/types';

export const projectsApi = {
  getAll: (params?: { is_active?: boolean; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.is_active !== undefined) {
      queryParams.append('is_active', params.is_active.toString());
    }
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    const query = queryParams.toString();
    return apiClient.get<Project[]>(`/projects/${query ? `?${query}` : ''}`);
  },

  getById: (id: number): Promise<Project> => {
    return apiClient.get<Project>(`/projects/${id}/`);
  },

  create: (data: Partial<Project>): Promise<Project> => {
    return apiClient.post<Project>('/projects/', data);
  },

  update: (id: number, data: Partial<Project>): Promise<Project> => {
    return apiClient.patch<Project>(`/projects/${id}/`, data);
  },

  delete: (id: number): Promise<void> => {
    return apiClient.delete(`/projects/${id}/`);
  },

  getTasks: (projectId: number): Promise<Task[]> => {
    return apiClient.get<Task[]>(`/projects/${projectId}/tasks/`);
  },
};





