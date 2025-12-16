'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tasksApi } from '@/lib/api/tasks';
import { Loading } from '@/components/common/loading';
import { ErrorMessage } from '@/components/common/error-message';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils/date';
import { TASK_STATUS_LABELS, TASK_PRIORITY_LABELS } from '@/lib/utils/constants';
import type { Task } from '@/types';

export default function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const taskId = parseInt(id);
  
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const data = await tasksApi.getById(taskId);
        setTask(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading) {
    return <Loading />;
  }

  if (error || !task) {
    return <ErrorMessage message={error || 'Task not found'} />;
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 whitespace-pre-wrap">
                {task.description || 'No description provided'}
              </p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{TASK_STATUS_LABELS[task.status]}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <p className="font-medium">{TASK_PRIORITY_LABELS[task.priority]}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Project</p>
                <p className="font-medium">{task.project_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Assigned To</p>
                <p className="font-medium">
                  {task.assigned_to_username || 'Unassigned'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created By</p>
                <p className="font-medium">{task.created_by_username}</p>
              </div>
              {task.due_date && (
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">{formatDate(task.due_date)}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">{formatDate(task.created_at)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


