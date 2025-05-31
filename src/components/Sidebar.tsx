import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`
              }
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/analytics"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`
              }
            >
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}