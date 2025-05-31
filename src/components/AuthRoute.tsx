import { Outlet } from 'react-router-dom';

// Simplified since auth logic is now in DashboardLayout
export default function AuthRoute() {
  return <Outlet />;
}