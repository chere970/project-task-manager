import { apiClient } from './client';
import type { Comment } from '@/types';

export const commentsApi = {
  getAll: (taskId?: number): Promise<Comment[]> => {
    const query = taskId ? `?task_id=${taskId}` : '';
    return apiClient.get<Comment[]>(`/comments/${query}`);
  },

  getById: (id: number): Promise<Comment> => {
    return apiClient.get<Comment>(`/comments/${id}/`);
  },

  create: (data: { task: number; text: string }): Promise<Comment> => {
    return apiClient.post<Comment>('/comments/', data);
  },

  update: (id: number, data: { text: string }): Promise<Comment> => {
    return apiClient.patch<Comment>(`/comments/${id}/`, data);
  },

  delete: (id: number): Promise<void> => {
    return apiClient.delete(`/comments/${id}/`);
  },
};





