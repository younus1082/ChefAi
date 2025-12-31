'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

interface AuthPageWrapperProps {
  children: React.ReactNode;
  pageName: 'login' | 'register';
}

const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({ children, pageName }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { addNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // User is already logged in, show notification and redirect
      addNotification(
        'You are already logged in. Redirecting to dashboard...',
        'info',
        3000
      );
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }
  }, [isAuthenticated, isLoading, addNotification, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-pink-100 to-purple-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, show a brief message before redirect
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-pink-100 to-purple-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">You are already logged in. Redirecting...</p>
        </div>
      </div>
    );
  }

  // User is not authenticated, show the auth page
  return <>{children}</>;
};

export default AuthPageWrapper;