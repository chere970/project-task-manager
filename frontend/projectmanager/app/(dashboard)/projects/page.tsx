'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/lib/hooks/use-projects';
import { ProjectList } from '@/components/projects/project-list';
import { Button } from '@/components/ui/button';

export default function ProjectsPage() {
  const router = useRouter();
  const { projects, loading, error, fetchProjects } = useProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <Button onClick={() => router.push('/projects/new')}>
          New Project
        </Button>
      </div>

      <ProjectList
        projects={projects}
        loading={loading}
        error={error}
        onRetry={fetchProjects}
        onCreateNew={() => router.push('/projects/new')}
      />
    </div>
  );
}


