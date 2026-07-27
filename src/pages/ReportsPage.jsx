import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { fetchReports } from '../api/mockApi';
import { exportToCsv } from '../utils/csv';
import Pagination from '../components/Pagination';

const NewReportModal = lazy(() => import('../components/NewReportModal'));

const RANGE_LABELS = {
  'last-7-days': 'Last 7 days',
  'last-30-days': 'Last 30 days',
  'this-quarter': 'This quarter',
  'this-year': 'This year',
};

const TYPES = ['all', 'Sales Report', 'Users Report', 'Orders Report', 'Revenue Report'];
const PAGE_SIZE = 5;

function formatToday() {
  return new Date().toISOString().slice(0, 10);
}

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchReports().then((data) => {
      setReports(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    if (typeFilter === 'all') return reports;
    return reports.filter((r) => r.type === typeFilter);
  }, [reports, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const summary = useMemo(() => {
    const thisMonth = reports.filter((r) =>
      r.generatedAt.startsWith('2026-07')
    ).length;
    const counts = reports.reduce((acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    }, {});
    const topType =
      Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—';
    return { total: reports.length, thisMonth, topType };
  }, [reports]);

  function handleTypeFilterChange(value) {
    setTypeFilter(value);
    setPage(1);
  }

  function handleGenerated({ type, range }) {
    const newReport = {
      id: `RPT-${2032 + reports.length}`,
      type,
      range: RANGE_LABELS[range] || range,
      generatedAt: formatToday(),
      status: 'Ready',
    };
    setReports((prev) => [newReport, ...prev]);
    setPage(1);
  }

  function handleExport() {
    exportToCsv(
      'reports.csv',
      filtered.map((r) => ({
        id: r.id,
        type: r.type,
        range: r.range,
        generatedAt: r.generatedAt,
        status: r.status,
      }))
    );
  }

  return (
    <>
      <h2 className="page-title">Reports</h2>
      <p className="page-subtitle">
        Browse and generate report snapshots from your dashboard data.
      </p>

      <section className="overview-cards">
        <article className="stat-card">
          <div className="stat-main">
            <div className="stat-text">
              <p className="stat-label">Total Reports</p>
              <p className="stat-value">{summary.total}</p>
            </div>
            <span className="stat-icon">
              <i className="bi bi-file-earmark-bar-graph" aria-hidden="true" />
            </span>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-main">
            <div className="stat-text">
              <p className="stat-label">Generated This Month</p>
              <p className="stat-value">{summary.thisMonth}</p>
            </div>
            <span className="stat-icon">
              <i className="bi bi-calendar-check" aria-hidden="true" />
            </span>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-main">
            <div className="stat-text">
              <p className="stat-label">Most Requested</p>
              <p className="stat-value" style={{ fontSize: 14 }}>
                {summary.topType}
              </p>
            </div>
            <span className="stat-icon">
              <i className="bi bi-star-fill" aria-hidden="true" />
            </span>
          </div>
        </article>
      </section>

      <article className="card table-card full-height">
        <div className="card-header-row">
          <div>
            <h2 className="card-title">Report History</h2>
            <p className="card-subtitle">
              {filtered.length} of {reports.length} reports
            </p>
          </div>

          <div className="users-filters">
            <select
              value={typeFilter}
              onChange={(e) => handleTypeFilterChange(e.target.value)}
              aria-label="Filter by report type"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t === 'all' ? 'All types' : t}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="icon-action-btn"
              onClick={handleExport}
              aria-label="Export reports to CSV"
              title="Export CSV"
            >
              <i className="bi bi-download" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="topbar-btn"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-lg" aria-hidden="true" />
              New Report
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Type</th>
                <th>Range</th>
                <th>Generated</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5">Loading reports...</td>
                </tr>
              )}

              {!loading &&
                pageItems.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.type}</td>
                    <td>{r.range}</td>
                    <td>{r.generatedAt}</td>
                    <td>
                      <span className="status-pill status-active">
                        <i className="bi bi-check-circle-fill" aria-hidden="true" />{' '}
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}

              {!loading && pageItems.length === 0 && (
                <tr>
                  <td colSpan="5">No reports match this filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </article>

      {showModal && (
        <Suspense fallback={null}>
          <NewReportModal
            onClose={() => setShowModal(false)}
            onGenerated={handleGenerated}
          />
        </Suspense>
      )}
    </>
  );
}
