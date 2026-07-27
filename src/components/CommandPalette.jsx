import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/useTheme';

const PAGES = [
  { label: 'Go to Dashboard', to: '/', icon: 'bi-grid-1x2-fill' },
  { label: 'Go to Users', to: '/users', icon: 'bi-people-fill' },
  { label: 'Go to Orders', to: '/orders', icon: 'bi-receipt' },
  { label: 'Go to Products', to: '/products', icon: 'bi-box-seam' },
  { label: 'Go to Reports', to: '/reports', icon: 'bi-file-earmark-bar-graph' },
  { label: 'Go to Settings', to: '/settings', icon: 'bi-gear-fill' },
];

export default function CommandPalette() {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    function handleKeydown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuery('');
        setOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    function handleOpenEvent() {
      setQuery('');
      setOpen(true);
    }

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('open-command-palette', handleOpenEvent);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('open-command-palette', handleOpenEvent);
    };
  }, []);

  const commands = useMemo(() => {
    const navCommands = PAGES.map((p) => ({
      id: `nav-${p.to}`,
      label: p.label,
      icon: p.icon,
      run: () => navigate(p.to),
    }));

    const actionCommands = [
      {
        id: 'toggle-theme',
        label: 'Toggle dark / light theme',
        icon: 'bi-moon-stars-fill',
        run: () => toggleTheme(),
      },
    ];

    const all = [...navCommands, ...actionCommands];
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter((c) => c.label.toLowerCase().includes(q));
  }, [query, navigate, toggleTheme]);

  function runCommand(cmd) {
    cmd.run();
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="modal-overlay command-overlay"
      onClick={() => setOpen(false)}
    >
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        <div className="command-input-row">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd>Esc</kbd>
        </div>

        <ul className="command-list">
          {commands.length === 0 && (
            <li className="command-empty">No matching commands</li>
          )}
          {commands.map((cmd) => (
            <li key={cmd.id}>
              <button type="button" onClick={() => runCommand(cmd)}>
                <i className={`bi ${cmd.icon}`} aria-hidden="true" />
                {cmd.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
