import { motion as Motion } from 'framer-motion';

export default function StatCard({ stat }) {
  const isDown = stat.trend.startsWith('-');

  return (
    <Motion.article
      className="stat-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -2,
        boxShadow: '0 20px 40px rgba(15,23,42,0.9)',
      }}
    >
      <div className="stat-main">
        <p className="stat-label">{stat.label}</p>
        <p className="stat-value">{stat.value}</p>
      </div>

      <p className={`stat-trend ${isDown ? 'down' : 'up'}`}>{stat.trend}</p>
    </Motion.article>
  );
}
