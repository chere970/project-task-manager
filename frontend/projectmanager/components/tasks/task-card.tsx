'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Task } from '@/types';
import { formatDate, isOverdue } from '@/lib/utils/date';
import { TASK_STATUS_LABELS, TASK_PRIORITY_LABELS } from '@/lib/utils/constants';

interface TaskCardProps {
  task: Task;
}

const statusColors = {
  TODO: 'bg-gray-200 text-gray-800',
  IN_PROGRESS: 'bg-blue-200 text-blue-800',
  DONE: 'bg-green-200 text-green-800',
};

const priorityColors = {
  LOW: 'bg-gray-100 text-gray-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  HIGH: 'bg-red-100 text-red-700',
};

export function TaskCard({ task }: TaskCardProps) {
  const overdue = task.due_date && isOverdue(task.due_date);

  return (
    <Link href={`/tasks/${task.id}`}>
      <Card className={`hover:shadow-lg transition-shadow cursor-pointer h-full ${overdue ? 'border-red-300' : ''}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-base">{task.title}</CardTitle>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded ${statusColors[task.status]}`}>
                {TASK_STATUS_LABELS[task.status]}
              </span>
              <span className={`px-2 py-1 text-xs rounded ${priorityColors[task.priority]}`}>
                {TASK_PRIORITY_LABELS[task.priority]}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {task.description || 'No description'}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3 text-gray-500">
              <span>{task.project_name}</span>
              {task.assigned_to_username && (
                <span>• {task.assigned_to_username}</span>
              )}
            </div>
            {task.due_date && (
              <span className={overdue ? 'text-red-600 font-medium' : 'text-gray-500'}>
                {formatDate(task.due_date)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}


