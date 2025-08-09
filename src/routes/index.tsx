import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import DashboardLayout from '../layouts/DashboardLayout';
import AgentsPage from '../pages/dashboard/AgentsPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import WorkflowsPage from '../pages/dashboard/WorkflowsPage';
import WorkflowPage from '../pages/dashboard/WorkflowPage';
import NewWorkflowPage from '../pages/dashboard/NewWorkflowPage';
import SettingsPage from '../pages/dashboard/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import AuthRoute from '../components/AuthRoute';
import GuestRoute from '../components/GuestRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'auth',
        element: <GuestRoute />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: 'dashboard',
        element: <AuthRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
              {
                path: 'new-workflow',
                element: <NewWorkflowPage />,
              },
              {
                path: 'workflows',
                element: <WorkflowsPage />,
              },
              {
                path: 'workflow/:id',
                element: <WorkflowPage />,
              },
              {
                path: 'agents',
                element: <AgentsPage />,
              },

              {
                path: 'settings',
                element: <SettingsPage />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);