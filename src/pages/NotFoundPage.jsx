import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <span className="not-found-icon">
        <i className="bi bi-signpost-split" aria-hidden="true" />
      </span>
      <h2 className="not-found-title">404 — Page not found</h2>
      <p className="not-found-subtitle">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="topbar-btn">
        <i className="bi bi-house-fill" aria-hidden="true" />
        Back to Dashboard
      </Link>
    </div>
  );
}
