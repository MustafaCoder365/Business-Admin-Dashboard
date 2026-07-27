import { useEffect, useRef, useState } from 'react';
import { fetchNotifications } from '../api/mockApi';

const ICONS = {
  info: 'bi-info-circle-fill',
  success: 'bi-check-circle-fill',
  warning: 'bi-exclamation-triangle-fill',
};

export default function NotificationsBell() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    fetchNotifications().then(setItems);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = items.filter((n) => !n.read).length;

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  return (
    <div className="notif-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="icon-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        <i className="bi bi-bell-fill" aria-hidden="true" />
        {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
      </button>

      {open && (
        <div className="notif-dropdown">
          <div className="notif-dropdown-header">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <button type="button" onClick={markAllRead}>
                Mark all as read
              </button>
            )}
          </div>

          <ul className="notif-list">
            {items.length === 0 && (
              <li className="notif-empty">You're all caught up.</li>
            )}
            {items.map((n) => (
              <li
                key={n.id}
                className={`notif-item ${n.read ? '' : 'unread'}`}
                onClick={() => markRead(n.id)}
              >
                <span className={`notif-icon notif-${n.type}`}>
                  <i className={`bi ${ICONS[n.type]}`} aria-hidden="true" />
                </span>
                <div className="notif-body">
                  <p className="notif-title">{n.title}</p>
                  <p className="notif-message">{n.message}</p>
                  <p className="notif-time">{n.time}</p>
                </div>
                {!n.read && <span className="notif-dot" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
