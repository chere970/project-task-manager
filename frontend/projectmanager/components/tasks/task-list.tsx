'use client';

import { TaskCard } from './task-card';
import { Loading } from '@/components/common/loading';
import { ErrorMessage } from '@/components/common/error-message';
import { EmptyState } from '@/components/common/empty-state';
import type { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  onCreateNew?: () => void;
}

export function TaskList({
  tasks,
  loading,
  error,
  onRetry,
  onCreateNew,
}: TaskListProps) {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks found"
        description="Create a new task to get started"
        action={
          onCreateNew
            ? {
                label: 'Create Task',
                onClick: onCreateNew,
              }
            : undefined
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}


