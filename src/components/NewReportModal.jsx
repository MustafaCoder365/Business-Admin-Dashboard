import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/useToast';

const REPORT_TYPES = ['Sales Report', 'Users Report', 'Orders Report', 'Revenue Report'];

export default function NewReportModal({ onClose, onGenerated }) {
  const [type, setType] = useState(REPORT_TYPES[0]);
  const [range, setRange] = useState('last-30-days');
  const [status, setStatus] = useState('idle'); // idle | generating | done
  const { addToast } = useToast();

  function handleGenerate(event) {
    event.preventDefault();
    setStatus('generating');
    setTimeout(() => {
      setStatus('done');
      onGenerated?.({ type, range });
      addToast(`${type} generated successfully`, 'success');
    }, 1200);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <AnimatePresence>
        <Motion.div
          className="modal-box"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>

          <h2 className="card-title">Generate New Report</h2>
          <p className="card-subtitle">
            Create a report snapshot from your dashboard data.
          </p>

          {status === 'done' ? (
            <div className="report-success">
              <p>
                <i className="bi bi-check-circle-fill" aria-hidden="true" />{' '}
                {type} generated for {range.replace(/-/g, ' ')}.
              </p>
              <button className="topbar-btn" onClick={onClose}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleGenerate}>
              <div className="settings-field">
                <label htmlFor="report-type">Report type</label>
                <select
                  id="report-type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {REPORT_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="settings-field">
                <label htmlFor="report-range">Date range</label>
                <select
                  id="report-range"
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                >
                  <option value="last-7-days">Last 7 days</option>
                  <option value="last-30-days">Last 30 days</option>
                  <option value="this-quarter">This quarter</option>
                  <option value="this-year">This year</option>
                </select>
              </div>

              <button
                type="submit"
                className="topbar-btn"
                disabled={status === 'generating'}
              >
                {status === 'generating' ? (
                  'Generating...'
                ) : (
                  <>
                    <i className="bi bi-file-earmark-bar-graph" aria-hidden="true" />
                    Generate report
                  </>
                )}
              </button>
            </form>
          )}
        </Motion.div>
      </AnimatePresence>
    </div>
  );
}
