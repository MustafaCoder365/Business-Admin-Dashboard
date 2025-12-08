import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import DashboardPage from '../pages/DashboardPage';
import UsersPage from '../pages/UsersPage';
import OrdersPage from '../pages/OrdersPage';
import SettingsPage from '../pages/SettingsPage';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className={`app-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} onToggle={handleToggleSidebar} />

      <div className="app-main">
        <Topbar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
