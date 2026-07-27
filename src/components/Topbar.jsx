import { Suspense, lazy, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/users';
import { orders } from '../data/orders';
import { useTheme } from '../context/useTheme';
import NotificationsBell from './NotificationsBell';
import ProfileMenu from './ProfileMenu';

const NewReportModal = lazy(() => import('./NewReportModal'));

const KIND_ICON = {
  User: 'bi-person-fill',
  Order: 'bi-receipt',
};

function highlightMatch(text, query) {
  if (!query.trim()) return text;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);
  return (
    <>
      {before}
      <mark>{match}</mark>
      {after}
    </>
  );
}

export default function Topbar({ onOpenMobileNav }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showReportModal, setShowReportModal] = useState(false);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const userMatches = users
      .filter((u) => u.name.toLowerCase().includes(q))
      .slice(0, 4)
      .map((u) => ({
        kind: 'User',
        label: u.name,
        sub: u.role,
        to: '/users',
      }));

    const orderMatches = orders
      .filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q)
      )
      .slice(0, 4)
      .map((o) => ({
        kind: 'Order',
        label: o.id,
        sub: o.customer,
        to: '/orders',
      }));

    return [...userMatches, ...orderMatches];
  }, [query]);

  function handleQueryChange(value) {
    setQuery(value);
    setActiveIndex(0);
  }

  function handleSelect(to) {
    setQuery('');
    setShowResults(false);
    navigate(to);
  }

  function handleClear() {
    setQuery('');
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (!showResults || results.length === 0) {
      if (e.key === 'Escape') {
        handleClear();
        inputRef.current?.blur();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = results[activeIndex] || results[0];
      if (target) handleSelect(target.to);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setShowResults(false);
      inputRef.current?.blur();
    }
  }

  return (
    <header className="topbar">
      <div className="topbar-heading">
        <button
          type="button"
          className="icon-btn mobile-nav-toggle"
          onClick={onOpenMobileNav}
          aria-label="Open navigation menu"
        >
          <i className="bi bi-list" aria-hidden="true" />
        </button>
        <div>
          <h1 className="topbar-title">Business Admin Dashboard</h1>
          <p className="topbar-subtitle">Overview of your platform performance</p>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="search-wrapper">
          <div className="search-input-shell">
            <i className="bi bi-search search-icon" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search users or orders..."
              aria-label="Search users or orders"
              role="combobox"
              aria-expanded={showResults && results.length > 0}
              aria-controls="topbar-search-results"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 150)}
              onKeyDown={handleKeyDown}
            />
            {query && (
              <button
                type="button"
                className="search-clear-btn"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClear}
                aria-label="Clear search"
              >
                <i className="bi bi-x" aria-hidden="true" />
              </button>
            )}
          </div>

          {showResults && query.trim() && (
            <div
              className="search-results-dropdown"
              id="topbar-search-results"
              role="listbox"
            >
              {results.length === 0 ? (
                <p className="search-no-results">No matches for "{query}"</p>
              ) : (
                results.map((r, i) => (
                  <button
                    key={`${r.kind}-${r.label}`}
                    type="button"
                    role="option"
                    aria-selected={i === activeIndex}
                    className={`search-result-row ${i === activeIndex ? 'active' : ''}`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseDown={() => handleSelect(r.to)}
                  >
                    <span className="search-result-icon">
                      <i className={`bi ${KIND_ICON[r.kind]}`} aria-hidden="true" />
                    </span>
                    <span className="search-result-kind">{r.kind}</span>
                    <span className="search-result-label">
                      {highlightMatch(r.label, query)}
                    </span>
                    <span className="search-result-sub">{r.sub}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          className="command-hint-btn"
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
          aria-label="Open command palette"
          title="Command palette"
        >
          <i className="bi bi-command" aria-hidden="true" />
          <kbd>Ctrl K</kbd>
        </button>

        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle dark and light theme"
          title="Toggle theme"
        >
          <i
            className={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`}
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          className="icon-btn shortcuts-hint-btn"
          onClick={() => window.dispatchEvent(new CustomEvent('open-shortcuts-help'))}
          aria-label="Show keyboard shortcuts"
          title="Keyboard shortcuts"
        >
          <i className="bi bi-question-circle" aria-hidden="true" />
        </button>

        <NotificationsBell />

        <button className="topbar-btn" onClick={() => setShowReportModal(true)}>
          <i className="bi bi-plus-lg" aria-hidden="true" />
          New Report
        </button>

        <ProfileMenu />
      </div>

      {showReportModal && (
        <Suspense fallback={null}>
          <NewReportModal onClose={() => setShowReportModal(false)} />
        </Suspense>
      )}
    </header>
  );
}
