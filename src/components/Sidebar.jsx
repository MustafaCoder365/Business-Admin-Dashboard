import { NavLink } from 'react-router-dom';

export default function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }) {
  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <div className="sidebar-header">
        <div className="logo-brand">
          <span className="logo-mark">
            <i className="bi bi-bar-chart-line-fill" aria-hidden="true" />
          </span>
          {!collapsed && <span className="logo-text">BizAdmin</span>}
        </div>
        <button
          className="toggle-btn"
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          <i
            className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" end className="nav-link" onClick={onCloseMobile}>
              <span className="icon">
                <i className="bi bi-grid-1x2-fill" aria-hidden="true" />
              </span>
              {!collapsed && <span className="text">Dashboard</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/users" className="nav-link" onClick={onCloseMobile}>
              <span className="icon">
                <i className="bi bi-people-fill" aria-hidden="true" />
              </span>
              {!collapsed && <span className="text">Users</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className="nav-link" onClick={onCloseMobile}>
              <span className="icon">
                <i className="bi bi-receipt" aria-hidden="true" />
              </span>
              {!collapsed && <span className="text">Orders</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/products" className="nav-link" onClick={onCloseMobile}>
              <span className="icon">
                <i className="bi bi-box-seam" aria-hidden="true" />
              </span>
              {!collapsed && <span className="text">Products</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/reports" className="nav-link" onClick={onCloseMobile}>
              <span className="icon">
                <i className="bi bi-file-earmark-bar-graph" aria-hidden="true" />
              </span>
              {!collapsed && <span className="text">Reports</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/settings" className="nav-link" onClick={onCloseMobile}>
              <span className="icon">
                <i className="bi bi-gear-fill" aria-hidden="true" />
              </span>
              {!collapsed && <span className="text">Settings</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-footer-avatar">MS</span>
        {!collapsed && (
          <div className="sidebar-footer-text">
            <p>Mustafa Shakir</p>
            <span>Administrator</span>
          </div>
        )}
      </div>
    </aside>
  );
}
