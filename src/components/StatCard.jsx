import { motion as Motion } from 'framer-motion';

export default function StatCard({ stat }) {
  const isDown = stat.trend.startsWith('-');

  return (
    <Motion.article
      className="stat-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <div className="stat-main">
        <div className="stat-text">
          <p className="stat-label">{stat.label}</p>
          <p className="stat-value">{stat.value}</p>
        </div>
        {stat.icon && (
          <span className="stat-icon">
            <i className={`bi ${stat.icon}`} aria-hidden="true" />
          </span>
        )}
      </div>

      <p className={`stat-trend ${isDown ? 'down' : 'up'}`}>
        <i
          className={`bi ${isDown ? 'bi-arrow-down-short' : 'bi-arrow-up-short'}`}
          aria-hidden="true"
        />
        {stat.trend}
      </p>
    </Motion.article>
  );
}
