import { useEffect, useState } from 'react';
import { fetchActivity } from '../api/mockApi';

export default function ActivityFeed() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchActivity().then(setItems);
  }, []);

  return (
    <article className="card activity-card">
      <h2 className="card-title">Recent Activity</h2>
      <p className="card-subtitle">Latest system updates</p>

      <ul className="activity-list">
        {items.map((item) => (
          <li key={item.id} className={`activity-item activity-${item.type}`}>
            <div className="activity-dot" />
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
