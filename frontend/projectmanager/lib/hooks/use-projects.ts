'use client';

import { useState, useEffect } from 'react';
import { projectsApi } from '@/lib/api/projects';
import type { Project } from '@/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (data: Partial<Project>) => {
    try {
      const newProject = await projectsApi.create(data);
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      throw err;
    }
  };

  const updateProject = async (id: number, data: Partial<Project>) => {
    try {
      const updated = await projectsApi.update(id, data);
      setProjects(prev => prev.map(p => p.id === id ? updated : p));
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await projectsApi.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}


