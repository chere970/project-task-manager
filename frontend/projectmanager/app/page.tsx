'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/auth-context';
import { Loading } from '@/components/common/loading';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/projects');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="max-w-2xl mx-auto text-center px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Task Manager
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your projects and tasks efficiently
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button size="lg">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" size="lg">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
