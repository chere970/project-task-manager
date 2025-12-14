'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/types';
import { formatDate } from '@/lib/utils/date';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            {!project.is_active && (
              <span className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded">
                Inactive
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {project.description || 'No description'}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>{project.tasks_count} tasks</span>
              <span>{project.members_count} members</span>
            </div>
            <span>{formatDate(project.created_at)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

