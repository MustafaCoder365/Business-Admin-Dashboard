import { useEffect, useMemo, useState } from 'react';
import { fetchOrders } from '../api/mockApi';
import { exportToCsv } from '../utils/csv';
import { useSortableData } from '../utils/useSortableData';
import { useCurrency } from '../context/useCurrency';
import { useToast } from '../context/useToast';
import SortableHeader from '../components/SortableHeader';
import Pagination from '../components/Pagination';
import OrderDetailDrawer from '../components/OrderDetailDrawer';

const STATUSES = ['all', 'processing', 'shipped', 'delivered', 'cancelled'];
const PAGE_SIZE = 6;

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const { format } = useCurrency();
  const { addToast } = useToast();

  useEffect(() => {
    fetchOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' || order.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const { sorted, sortKey, sortDir, requestSort } = useSortableData(
    filtered,
    'date',
    'desc'
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageItems = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageIds = pageItems.map((o) => o.id);
  const allPageSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));

  const summary = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
    const pending = orders.filter((o) => o.status === 'Processing').length;
    const delivered = orders.filter((o) => o.status === 'Delivered').length;
    return { totalRevenue, pending, delivered, total: orders.length };
  }, [orders]);

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }

  function handleStatusChange(value) {
    setStatusFilter(value);
    setPage(1);
  }

  function toggleSelect(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectPage() {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  }

  function clearSelection() {
    setSelectedIds(new Set());
  }

  function handleExport() {
    exportToCsv(
      'orders.csv',
      sorted.map((o) => ({
        id: o.id,
        customer: o.customer,
        items: o.items,
        amount: o.amount,
        date: o.date,
        status: o.status,
      }))
    );
  }

  function handleExportSelected() {
    const rows = orders.filter((o) => selectedIds.has(o.id));
    exportToCsv(
      'selected-orders.csv',
      rows.map((o) => ({
        id: o.id,
        customer: o.customer,
        items: o.items,
        amount: o.amount,
        date: o.date,
        status: o.status,
      }))
    );
    addToast(`Exported ${rows.length} orders`, 'success');
  }

  function handleBulkMarkShipped() {
    const count = selectedIds.size;
    setOrders((prev) =>
      prev.map((o) =>
        selectedIds.has(o.id) && o.status !== 'Cancelled'
          ? { ...o, status: 'Shipped' }
          : o
      )
    );
    addToast(`Marked ${count} orders as Shipped`, 'success');
    clearSelection();
  }

  return (
    <>
      <h2 className="page-title">Orders</h2>
      <p className="page-subtitle">Track and manage all customer orders.</p>

      <section className="overview-cards">
        <article className="stat-card">
          <div className="stat-main">
            <div className="stat-text">
              <p className="stat-label">Total Orders</p>
              <p className="stat-value">{summary.total}</p>
            </div>
            <span className="stat-icon">
              <i className="bi bi-bag-check-fill" aria-hidden="true" />
            </span>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-main">
            <div className="stat-text">
              <p className="stat-label">Total Revenue</p>
              <p className="stat-value">{format(summary.totalRevenue)}</p>
            </div>
            <span className="stat-icon">
              <i className="bi bi-cash-coin" aria-hidden="true" />
            </span>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-main">
            <div className="stat-text">
              <p className="stat-label">Processing</p>
              <p className="stat-value">{summary.pending}</p>
            </div>
            <span className="stat-icon">
              <i className="bi bi-hourglass-split" aria-hidden="true" />
            </span>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-main">
            <div className="stat-text">
              <p className="stat-label">Delivered</p>
              <p className="stat-value">{summary.delivered}</p>
            </div>
            <span className="stat-icon">
              <i className="bi bi-truck" aria-hidden="true" />
            </span>
          </div>
        </article>
      </section>

      <article className="card table-card full-height">
        <div className="card-header-row">
          <div>
            <h2 className="card-title">All Orders</h2>
            <p className="card-subtitle">
              {sorted.length} of {orders.length} orders · click a row for details
            </p>
          </div>

          <div className="users-filters">
            <input
              type="text"
              placeholder="Search order ID or customer..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Search orders"
            />
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === 'all'
                    ? 'All'
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="icon-action-btn"
              onClick={handleExport}
              aria-label="Export orders to CSV"
              title="Export CSV"
            >
              <i className="bi bi-download" aria-hidden="true" />
            </button>
          </div>
        </div>

        {selectedIds.size > 0 && (
          <div className="bulk-action-bar">
            <span>{selectedIds.size} selected</span>
            <div className="bulk-action-buttons">
              <button type="button" onClick={handleExportSelected}>
                <i className="bi bi-download" aria-hidden="true" />
                Export selected
              </button>
              <button type="button" onClick={handleBulkMarkShipped}>
                <i className="bi bi-truck" aria-hidden="true" />
                Mark as Shipped
              </button>
              <button type="button" onClick={clearSelection} className="ghost">
                Clear
              </button>
            </div>
          </div>
        )}

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={toggleSelectPage}
                    aria-label="Select all orders on this page"
                  />
                </th>
                <SortableHeader
                  label="Order ID"
                  sortKey="id"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={requestSort}
                />
                <SortableHeader
                  label="Customer"
                  sortKey="customer"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={requestSort}
                />
                <th>Items</th>
                <SortableHeader
                  label="Amount"
                  sortKey="amount"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={requestSort}
                />
                <SortableHeader
                  label="Date"
                  sortKey="date"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={requestSort}
                />
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="7">Loading orders...</td>
                </tr>
              )}

              {!loading &&
                pageItems.map((order) => (
                  <tr key={order.id} className="clickable-row">
                    <td
                      className="checkbox-cell"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={selectedIds.has(order.id)}
                        onChange={() => toggleSelect(order.id)}
                        aria-label={`Select order ${order.id}`}
                      />
                    </td>
                    <td onClick={() => setSelectedOrder(order)}>{order.id}</td>
                    <td onClick={() => setSelectedOrder(order)}>
                      {order.customer}
                    </td>
                    <td onClick={() => setSelectedOrder(order)}>
                      {order.items}
                    </td>
                    <td onClick={() => setSelectedOrder(order)}>
                      {format(order.amount)}
                    </td>
                    <td onClick={() => setSelectedOrder(order)}>
                      {order.date}
                    </td>
                    <td onClick={() => setSelectedOrder(order)}>
                      <span
                        className={`status-pill status-${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}

              {!loading && pageItems.length === 0 && (
                <tr>
                  <td colSpan="7">No orders match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </article>

      <OrderDetailDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
