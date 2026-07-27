import { useEffect, useMemo, useState } from 'react';
import { fetchUsers } from '../api/mockApi';
import { exportToCsv } from '../utils/csv';
import { useSortableData } from '../utils/useSortableData';
import SortableHeader from './SortableHeader';
import Pagination from './Pagination';
import UserDetailDrawer from './UserDetailDrawer';

const PAGE_SIZE = 5;

export default function UsersTable({ fullHeight }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.country.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || u.status.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  const { sorted, sortKey, sortDir, requestSort } = useSortableData(
    filtered,
    'name'
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageItems = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }

  function handleStatusChange(value) {
    setStatusFilter(value);
    setPage(1);
  }

  function handleExport() {
    exportToCsv(
      'users.csv',
      sorted.map((u) => ({
        name: u.name,
        role: u.role,
        country: u.country,
        status: u.status,
      }))
    );
  }

  return (
    <article className={`card table-card ${fullHeight ? 'full-height' : ''}`}>
      <div className="card-header-row">
        <div>
          <h2 className="card-title">Users</h2>
          <p className="card-subtitle">Recent active users</p>
        </div>

        <div className="users-filters">
          <input
            type="text"
            placeholder="Search name or country..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            type="button"
            className="icon-action-btn"
            onClick={handleExport}
            aria-label="Export users to CSV"
            title="Export CSV"
          >
            <i className="bi bi-download" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <SortableHeader
                label="Name"
                sortKey="name"
                activeKey={sortKey}
                dir={sortDir}
                onSort={requestSort}
              />
              <SortableHeader
                label="Role"
                sortKey="role"
                activeKey={sortKey}
                dir={sortDir}
                onSort={requestSort}
              />
              <SortableHeader
                label="Country"
                sortKey="country"
                activeKey={sortKey}
                dir={sortDir}
                onSort={requestSort}
              />
              <SortableHeader
                label="Status"
                sortKey="status"
                activeKey={sortKey}
                dir={sortDir}
                onSort={requestSort}
              />
            </tr>
          </thead>
          <tbody>
            {pageItems.map((u) => (
              <tr
                key={u.id}
                className="clickable-row"
                onClick={() => setSelectedUser(u)}
              >
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td>{u.country}</td>
                <td>
                  <span
                    className={`status-pill status-${u.status.toLowerCase()}`}
                  >
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan="4">No users match your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <UserDetailDrawer
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </article>
  );
}
