'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTasks } from '@/lib/hooks/use-tasks';
import { TaskList } from '@/components/tasks/task-list';
import { Button } from '@/components/ui/button';

export default function TasksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assignedTo = searchParams.get('assigned_to');
  
  const filters = assignedTo === 'me' ? { assigned_to: 'me' as const } : undefined;
  const { tasks, loading, error, fetchTasks } = useTasks(filters);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {assignedTo === 'me' ? 'My Tasks' : 'All Tasks'}
        </h1>
        <Button onClick={() => router.push('/tasks/new')}>
          New Task
        </Button>
      </div>

      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onRetry={fetchTasks}
        onCreateNew={() => router.push('/tasks/new')}
      />
    </div>
  );
}


