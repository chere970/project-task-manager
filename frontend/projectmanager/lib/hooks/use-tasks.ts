'use client';

import { useState, useEffect } from 'react';
import { tasksApi } from '@/lib/api/tasks';
import type { Task } from '@/types';

interface TaskFilters {
  project?: number;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  assigned_to?: 'me' | number;
}

export function useTasks(filters?: TaskFilters) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tasksApi.getAll(filters);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters?.project, filters?.status, filters?.priority, filters?.assigned_to]);

  const createTask = async (data: Partial<Task>) => {
    try {
      const newTask = await tasksApi.create(data);
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      throw err;
    }
  };

  const updateTask = async (id: number, data: Partial<Task>) => {
    try {
      const updated = await tasksApi.update(id, data);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await tasksApi.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}





