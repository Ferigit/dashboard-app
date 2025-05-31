import { Outlet } from 'react-router-dom';
import useAuthStore from '../stores/auth.store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GuestRoute() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
}