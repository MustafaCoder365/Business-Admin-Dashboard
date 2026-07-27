import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchActivity } from '../api/mockApi';

const ICONS = {
  info: 'bi-info-circle-fill',
  success: 'bi-check-circle-fill',
  warning: 'bi-exclamation-triangle-fill',
};

export default function ActivityFeed() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivity().then((data) => setItems(data.slice(0, 4)));
  }, []);

  return (
    <article className="card activity-card">
      <div className="card-header-row">
        <div>
          <h2 className="card-title">Recent Activity</h2>
          <p className="card-subtitle">Latest system updates</p>
        </div>
        <button
          type="button"
          className="card-link-btn"
          onClick={() => navigate('/activity')}
        >
          View all
          <i className="bi bi-arrow-right" aria-hidden="true" />
        </button>
      </div>

      <ul className="activity-list">
        {items.map((item) => (
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
      </ul>
    </article>
  );
}
