import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../api/mockApi';
import { useCurrency } from '../context/useCurrency';

const STATUS_ICON = {
  Delivered: 'bi-check-circle-fill',
  Shipped: 'bi-truck',
  Processing: 'bi-hourglass-split',
  Cancelled: 'bi-x-circle-fill',
};

export default function RecentTransactions() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { format } = useCurrency();

  useEffect(() => {
    fetchOrders().then((data) => setOrders(data.slice(0, 5)));
  }, []);

  return (
    <article className="card">
      <div className="card-header-row">
        <div>
          <h2 className="card-title">Recent Transactions</h2>
          <p className="card-subtitle">Latest 5 orders across the platform</p>
        </div>
        <button
          type="button"
          className="card-link-btn"
          onClick={() => navigate('/orders')}
        >
          View all
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </button>
      </div>

      <ul className="transaction-list">
        {orders.map((order) => (
          <li key={order.id} className="transaction-row">
            <span
              className={`transaction-icon status-${order.status.toLowerCase()}`}
            >
              <i
                className={`bi ${STATUS_ICON[order.status] || 'bi-receipt'}`}
                aria-hidden="true"
              />
            </span>
            <div className="transaction-info">
              <p className="transaction-title">{order.customer}</p>
              <p className="transaction-sub">
                {order.id} · {order.date}
              </p>
            </div>
            <span className="transaction-amount">{format(order.amount)}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
