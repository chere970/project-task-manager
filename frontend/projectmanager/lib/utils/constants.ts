export const TASK_STATUSES = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const;

export const TASK_STATUS_LABELS = {
  [TASK_STATUSES.TODO]: 'To Do',
  [TASK_STATUSES.IN_PROGRESS]: 'In Progress',
  [TASK_STATUSES.DONE]: 'Done',
} as const;

export const TASK_PRIORITIES = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITIES.LOW]: 'Low',
  [TASK_PRIORITIES.MEDIUM]: 'Medium',
  [TASK_PRIORITIES.HIGH]: 'High',
} as const;

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  DEVELOPER: 'DEVELOPER',
} as const;

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.MANAGER]: 'Project Manager',
  [USER_ROLES.DEVELOPER]: 'Developer',
} as const;


