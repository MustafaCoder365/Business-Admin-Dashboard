import { motion as Motion, AnimatePresence } from 'framer-motion';

const STEPS = ['Processing', 'Shipped', 'Delivered'];

export default function OrderDetailDrawer({ order, onClose }) {
  const isCancelled = order?.status === 'Cancelled';
  const currentStep = STEPS.indexOf(order?.status);

  return (
    <AnimatePresence>
      {order && (
        <>
          <Motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <Motion.aside
            className="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="drawer-header">
              <h2>{order.id}</h2>
              <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Close order details"
              >
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>

            <div className="drawer-body">
              <div className="drawer-row">
                <span className="drawer-label">Customer</span>
                <span className="drawer-value">{order.customer}</span>
              </div>
              <div className="drawer-row">
                <span className="drawer-label">Date placed</span>
                <span className="drawer-value">{order.date}</span>
              </div>
              <div className="drawer-row">
                <span className="drawer-label">Items</span>
                <span className="drawer-value">{order.items}</span>
              </div>
              <div className="drawer-row">
                <span className="drawer-label">Amount</span>
                <span className="drawer-value">${order.amount.toFixed(2)}</span>
              </div>
              <div className="drawer-row">
                <span className="drawer-label">Status</span>
                <span
                  className={`status-pill status-${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </div>

              {!isCancelled ? (
                <div className="drawer-timeline">
                  {STEPS.map((step, i) => (
                    <div
                      key={step}
                      className={`timeline-step ${i <= currentStep ? 'done' : ''}`}
                    >
                      <span className="timeline-dot">
                        {i <= currentStep && (
                          <i className="bi bi-check" aria-hidden="true" />
                        )}
                      </span>
                      <span className="timeline-label">{step}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="drawer-cancelled-note">
                  <i className="bi bi-x-circle-fill" aria-hidden="true" /> This
                  order was cancelled.
                </p>
              )}
            </div>
          </Motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
