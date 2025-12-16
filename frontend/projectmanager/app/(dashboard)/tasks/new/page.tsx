'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTasks } from '@/lib/hooks/use-tasks';
import { useProjects } from '@/lib/hooks/use-projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { LoadingSpinner } from '@/components/common/loading';
import { TASK_STATUSES, TASK_PRIORITIES } from '@/lib/utils/constants';

export default function NewTaskPage() {
  const router = useRouter();
  const { createTask } = useTasks();
  const { projects } = useProjects();
  const [formData, setFormData] = useState({
    project: '',
    title: '',
    description: '',
    status: TASK_STATUSES.TODO,
    priority: TASK_PRIORITIES.MEDIUM,
    due_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const task = await createTask({
        ...formData,
        project: parseInt(formData.project),
        due_date: formData.due_date || null,
      });
      router.push(`/tasks/${task.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Task</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Task Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {error && (
                <div className="text-sm text-red-500 mb-4">{error}</div>
              )}
              
              <Field>
                <FieldLabel htmlFor="project">Project</FieldLabel>
                <select
                  id="project"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="title">Task Title</FieldLabel>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Enter task title"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter task description"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="status">Status</FieldLabel>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={TASK_STATUSES.TODO}>To Do</option>
                    <option value={TASK_STATUSES.IN_PROGRESS}>In Progress</option>
                    <option value={TASK_STATUSES.DONE}>Done</option>
                  </select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="priority">Priority</FieldLabel>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={TASK_PRIORITIES.LOW}>Low</option>
                    <option value={TASK_PRIORITIES.MEDIUM}>Medium</option>
                    <option value={TASK_PRIORITIES.HIGH}>High</option>
                  </select>
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="due_date">Due Date (Optional)</FieldLabel>
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                />
              </Field>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? <LoadingSpinner size="sm" /> : 'Create Task'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


