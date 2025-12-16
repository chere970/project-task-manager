'use client';

import { useAuth } from '@/lib/context/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Welcome back, {user?.first_name || user?.username}!
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-sm text-gray-600">
              {user.role}
            </span>
          )}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="text-sm"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}


