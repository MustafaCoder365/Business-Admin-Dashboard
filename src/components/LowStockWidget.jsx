import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../api/mockApi';
import { statusForStock } from '../data/products';

export default function LowStockWidget() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts().then((data) => {
      const low = data
        .filter((p) => p.stock <= 10)
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 5);
      setItems(low);
    });
  }, []);

  if (items.length === 0) return null;

  return (
    <article className="card">
      <div className="card-header-row">
        <div>
          <h2 className="card-title">Low Stock Alerts</h2>
          <p className="card-subtitle">Products that need restocking soon</p>
        </div>
        <button
          type="button"
          className="card-link-btn"
          onClick={() => navigate('/products')}
        >
          View all
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </button>
      </div>

      <ul className="transaction-list">
        {items.map((p) => {
          const status = statusForStock(p.stock);
          return (
            <li key={p.id} className="transaction-row">
              <span
                className={`transaction-icon status-${
                  status === 'Out of Stock' ? 'cancelled' : 'processing'
                }`}
              >
                <i className="bi bi-box-seam" aria-hidden="true" />
              </span>
              <div className="transaction-info">
                <p className="transaction-title">{p.name}</p>
                <p className="transaction-sub">{p.category}</p>
              </div>
              <span
                className={`status-pill ${
                  status === 'Out of Stock'
                    ? 'status-cancelled'
                    : 'status-pending'
                }`}
              >
                {status === 'Out of Stock' ? status : `${p.stock} left`}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
