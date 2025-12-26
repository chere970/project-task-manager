import { apiClient } from './client';
import type { Task } from '@/types';

interface TaskFilters {
  project?: number;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  assigned_to?: 'me' | number;
  search?: string;
}

export const tasksApi = {
  getAll: (filters?: TaskFilters): Promise<Task[]> => {
    const queryParams = new URLSearchParams();
    if (filters?.project) {
      queryParams.append('project', filters.project.toString());
    }
    if (filters?.status) {
      queryParams.append('status', filters.status);
    }
    if (filters?.priority) {
      queryParams.append('priority', filters.priority);
    }
    if (filters?.assigned_to) {
      queryParams.append('assigned_to', filters.assigned_to.toString());
    }
    if (filters?.search) {
      queryParams.append('search', filters.search);
    }
    const query = queryParams.toString();
    return apiClient.get<Task[]>(`/tasks/${query ? `?${query}` : ''}`);
  },

  getById: (id: number): Promise<Task> => {
    return apiClient.get<Task>(`/tasks/${id}/`);
  },

  create: (data: Partial<Task>): Promise<Task> => {
    return apiClient.post<Task>('/tasks/', data);
  },

  update: (id: number, data: Partial<Task>): Promise<Task> => {
    return apiClient.patch<Task>(`/tasks/${id}/`, data);
  },

  delete: (id: number): Promise<void> => {
    return apiClient.delete(`/tasks/${id}/`);
  },

  getMyTasks: (): Promise<Task[]> => {
    return apiClient.get<Task[]>('/tasks/my_tasks/');
  },
};





