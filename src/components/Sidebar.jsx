import { NavLink } from 'react-router-dom';

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <span className="logo-text">BizAdmin</span>}
        <button
          className="toggle-btn"
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          {collapsed ? '➡️' : '⬅️'}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" end className="nav-link">
              <span className="icon">📊</span>
              {!collapsed && <span className="text">Dashboard</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/users" className="nav-link">
              <span className="icon">👤</span>
              {!collapsed && <span className="text">Users</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className="nav-link">
              <span className="icon">🧾</span>
              {!collapsed && <span className="text">Orders</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" className="nav-link">
              <span className="icon">⚙️</span>
              {!collapsed && <span className="text">Settings</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
