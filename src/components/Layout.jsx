import { Suspense, lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import CommandPalette from './CommandPalette';
import ShortcutsHelpModal from './ShortcutsHelpModal';

const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const UsersPage = lazy(() => import('../pages/UsersPage'));
const OrdersPage = lazy(() => import('../pages/OrdersPage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const ReportsPage = lazy(() => import('../pages/ReportsPage'));
const ActivityPage = lazy(() => import('../pages/ActivityPage'));
const SettingsPage = lazy(() => import('../pages/SettingsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleToggleSidebar = () => setCollapsed((prev) => !prev);
  const handleToggleMobileNav = () => setMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className={`app-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        collapsed={collapsed}
        onToggle={handleToggleSidebar}
        mobileOpen={mobileNavOpen}
        onCloseMobile={closeMobileNav}
      />

      {mobileNavOpen && (
        <div className="mobile-nav-overlay" onClick={closeMobileNav} />
      )}

      <div className="app-main">
        <Topbar onOpenMobileNav={handleToggleMobileNav} />
        <main className="app-content">
          <Suspense fallback={<p className="page-loading">Loading page...</p>}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>

      <CommandPalette />
      <ShortcutsHelpModal />
    </div>
  );
}
