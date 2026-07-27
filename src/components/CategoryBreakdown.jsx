import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { fetchCategories } from '../api/mockApi';

export default function CategoryBreakdown() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCategories().then(setData);
  }, []);

  return (
    <article className="card">
      <h2 className="card-title">Sales by Category</h2>
      <p className="card-subtitle">Share of total revenue this month</p>

      <ul className="category-list">
        {data.map((cat) => (
          <li key={cat.id} className="category-row">
            <div className="category-row-top">
              <span className="category-label">
                <i className={`bi ${cat.icon}`} aria-hidden="true" />
                {cat.label}
              </span>
              <span className="category-value">{cat.value}%</span>
            </div>
            <div className="category-track">
              <Motion.div
                className="category-fill"
                initial={{ width: 0 }}
                animate={{ width: `${cat.value}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
