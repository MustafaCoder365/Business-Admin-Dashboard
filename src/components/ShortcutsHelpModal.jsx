import { useEffect, useState } from 'react';

const SHORTCUTS = [
  { keys: ['Ctrl', 'K'], mac: ['⌘', 'K'], desc: 'Open the command palette' },
  { keys: ['↑', '↓'], desc: 'Navigate search / command results' },
  { keys: ['Enter'], desc: 'Select the highlighted result' },
  { keys: ['Esc'], desc: 'Close search, modals, or the palette' },
  { keys: ['?'], desc: 'Show this shortcuts guide' },
];

function isTypingTarget(el) {
  if (!el) return false;
  const tag = el.tagName?.toLowerCase();
  return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
}

export default function ShortcutsHelpModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === '?' && !isTypingTarget(document.activeElement)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    function handleOpenEvent() {
      setOpen(true);
    }

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('open-shortcuts-help', handleOpenEvent);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('open-shortcuts-help', handleOpenEvent);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={() => setOpen(false)}>
      <div className="modal-box shortcuts-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>

        <h2 className="card-title">Keyboard Shortcuts</h2>
        <p className="card-subtitle">Move around the dashboard faster.</p>

        <ul className="shortcuts-list">
          {SHORTCUTS.map((s) => (
            <li key={s.desc} className="shortcuts-row">
              <span className="shortcuts-desc">{s.desc}</span>
              <span className="shortcuts-keys">
                {s.keys.map((k) => (
                  <kbd key={k}>{k}</kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
