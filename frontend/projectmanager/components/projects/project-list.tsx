'use client';

import { ProjectCard } from './project-card';
import { Loading } from '@/components/common/loading';
import { ErrorMessage } from '@/components/common/error-message';
import { EmptyState } from '@/components/common/empty-state';
import type { Project } from '@/types';

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  onCreateNew?: () => void;
}

export function ProjectList({
  projects,
  loading,
  error,
  onRetry,
  onCreateNew,
}: ProjectListProps) {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects found"
        description="Get started by creating a new project"
        action={
          onCreateNew
            ? {
                label: 'Create Project',
                onClick: onCreateNew,
              }
            : undefined
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

