import { motion as Motion, AnimatePresence } from 'framer-motion';

function emailFor(name) {
  return `${name.toLowerCase().replace(/\s+/g, '.')}@bizadmin.io`;
}

export default function UserDetailDrawer({ user, onClose }) {
  return (
    <AnimatePresence>
      {user && (
        <>
          <Motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <Motion.aside
            className="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="drawer-header">
              <h2>{user.name}</h2>
              <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Close user details"
              >
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>

            <div className="drawer-user-avatar">
              <span className="profile-avatar large">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </span>
            </div>

            <div className="drawer-body">
              <div className="drawer-row">
                <span className="drawer-label">Email</span>
                <span className="drawer-value">{emailFor(user.name)}</span>
              </div>
              <div className="drawer-row">
                <span className="drawer-label">Role</span>
                <span className="drawer-value">{user.role}</span>
              </div>
              <div className="drawer-row">
                <span className="drawer-label">Country</span>
                <span className="drawer-value">{user.country}</span>
              </div>
              <div className="drawer-row">
                <span className="drawer-label">Status</span>
                <span
                  className={`status-pill status-${user.status.toLowerCase()}`}
                >
                  {user.status}
                </span>
              </div>
              <div className="drawer-row">
                <span className="drawer-label">Member since</span>
                <span className="drawer-value">Jan 2025</span>
              </div>
            </div>
          </Motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
