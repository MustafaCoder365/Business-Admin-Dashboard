import { useEffect, useMemo, useState } from 'react';
import { fetchActivity } from '../api/mockApi';
import Pagination from '../components/Pagination';

const ICONS = {
  info: 'bi-info-circle-fill',
  success: 'bi-check-circle-fill',
  warning: 'bi-exclamation-triangle-fill',
};

const TYPES = ['all', 'info', 'success', 'warning'];
const PAGE_SIZE = 6;

export default function ActivityPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchActivity().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.message
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [items, search, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }

  function handleTypeChange(value) {
    setTypeFilter(value);
    setPage(1);
  }

  return (
    <>
      <h2 className="page-title">Activity Log</h2>
      <p className="page-subtitle">
        A complete history of events across your dashboard.
      </p>

      <div className="chip-group">
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            className={`chip ${typeFilter === t ? 'active' : ''}`}
            onClick={() => handleTypeChange(t)}
          >
            {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <article className="card table-card full-height">
        <div className="card-header-row">
          <div>
            <h2 className="card-title">All Events</h2>
            <p className="card-subtitle">
              {filtered.length} of {items.length} events
            </p>
          </div>

          <div className="users-filters">
            <input
              type="text"
              placeholder="Search activity..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Search activity"
            />
          </div>
        </div>

        {loading && <p className="page-loading">Loading activity...</p>}

        {!loading && (
          <ul className="activity-list">
            {pageItems.map((item) => (
              <li key={item.id} className={`activity-item activity-${item.type}`}>
                <span className="activity-dot">
                  <i
                    className={`bi ${ICONS[item.type] || 'bi-circle-fill'}`}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p className="activity-message">{item.message}</p>
                  <p className="activity-time">{item.time}</p>
                </div>
              </li>
            ))}

            {pageItems.length === 0 && (
              <li className="notif-empty">No activity matches your filters.</li>
            )}
          </ul>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </article>
    </>
  );
}
