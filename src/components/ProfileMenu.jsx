import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [signedOut, setSignedOut] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function goTo(path) {
    setOpen(false);
    navigate(path);
  }

  if (signedOut) {
    return (
      <div className="signed-out-banner">
        <span>Signed out (demo)</span>
        <button type="button" onClick={() => setSignedOut(false)}>
          Sign back in
        </button>
      </div>
    );
  }

  return (
    <div className="profile-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="profile-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open profile menu"
      >
        <span className="profile-avatar">MS</span>
      </button>

      {open && (
        <div className="profile-dropdown">
          <div className="profile-dropdown-header">
            <span className="profile-avatar">MS</span>
            <div>
              <p className="profile-name">Mustafa Shakir</p>
              <p className="profile-role">Administrator</p>
            </div>
          </div>

          <ul className="profile-menu-list">
            <li>
              <button type="button" onClick={() => goTo('/settings')}>
                <i className="bi bi-person-circle" aria-hidden="true" />
                View profile
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goTo('/settings')}>
                <i className="bi bi-gear" aria-hidden="true" />
                Account settings
              </button>
            </li>
            <li className="profile-menu-divider" />
            <li>
              <button
                type="button"
                className="danger"
                onClick={() => {
                  setOpen(false);
                  setSignedOut(true);
                }}
              >
                <i className="bi bi-box-arrow-right" aria-hidden="true" />
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
