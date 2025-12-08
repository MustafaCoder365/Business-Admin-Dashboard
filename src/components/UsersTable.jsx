import { useEffect, useState } from 'react';
import { fetchUsers } from '../api/mockApi';

export default function UsersTable({ fullHeight }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.country.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || u.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Country</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan="4">No users match your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </article>
  );
}
