import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from './stores/auth.store';

export default function App() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/auth/login');
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Outlet />
    </div>
  );
}