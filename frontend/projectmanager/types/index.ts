export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'ADMIN' | 'MANAGER' | 'DEVELOPER';
}

export interface Project {
  id: number;
  name: string;
  description: string;
  created_by: number;
  created_by_username: string;
  created_by_email: string;
  members: number[];
  members_count: number;
  tasks_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: number;
  project: number;
  project_name: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assigned_to: number | null;
  assigned_to_username: string | null;
  assigned_to_email: string | null;
  created_by: number;
  created_by_username: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  task: number;
  user: number;
  user_username?: string;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
  message: string;
}

export interface RegisterResponse {
  user: User;
  tokens: AuthTokens;
  message: string;
}

