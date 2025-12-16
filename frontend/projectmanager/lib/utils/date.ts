export function formatDate(dateString: string | null): string {
  if (!dateString) return 'No date';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function isOverdue(dateString: string | null): boolean {
  if (!dateString) return false;
  return new Date(dateString) < new Date();
}

export function getDaysUntil(dateString: string | null): number {
  if (!dateString) return 0;
  const today = new Date();
  const dueDate = new Date(dateString);
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}


