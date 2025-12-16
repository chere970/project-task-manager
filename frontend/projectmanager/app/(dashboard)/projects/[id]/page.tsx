'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { projectsApi } from '@/lib/api/projects';
import { useTasks } from '@/lib/hooks/use-tasks';
import { Loading } from '@/components/common/loading';
import { ErrorMessage } from '@/components/common/error-message';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils/date';
import type { Project } from '@/types';

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const projectId = parseInt(id);
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { tasks, loading: tasksLoading } = useTasks({ project: projectId });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getById(projectId);
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return <Loading />;
  }

  if (error || !project) {
    return <ErrorMessage message={error || 'Project not found'} />;
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          ← Back to Projects
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {project.description || 'No description provided'}
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tasks ({tasks.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {tasksLoading ? (
                <Loading />
              ) : tasks.length === 0 ? (
                <p className="text-gray-500">No tasks in this project</p>
              ) : (
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/tasks/${task.id}`)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{task.title}</span>
                        <span className="text-sm text-gray-500">{task.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Created by</p>
                <p className="font-medium">{project.created_by_username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Members</p>
                <p className="font-medium">{project.members_count}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tasks</p>
                <p className="font-medium">{project.tasks_count}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">{formatDate(project.created_at)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">
                  {project.is_active ? 'Active' : 'Inactive'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

