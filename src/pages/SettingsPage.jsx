import { useEffect, useState } from 'react';
import { useCurrency } from '../context/useCurrency';
import { CURRENCIES } from '../data/currencies';
import { useToast } from '../context/useToast';

const STORAGE_KEY = 'dashboard-settings';

const defaultSettings = {
  name: 'Mustafa Shakir',
  email: 'mustafa1997670@gmail.com',
  role: 'Administrator',
  emailAlerts: true,
  weeklyReport: true,
  orderUpdates: false,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });
  const [saved, setSaved] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const { addToast } = useToast();

  useEffect(() => {
    if (!saved) return;
    const timer = setTimeout(() => setSaved(false), 2200);
    return () => clearTimeout(timer);
  }, [saved]);

  function handleField(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  function toggleField(field) {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  function handleSave(event) {
    event.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSaved(true);
    addToast('Settings saved successfully', 'success');
  }

  return (
    <>
      <h2 className="page-title">Settings</h2>
      <p className="page-subtitle">Configure your business admin dashboard.</p>

      <form className="settings-grid" onSubmit={handleSave}>
        <article className="card settings-card">
          <h2 className="card-title">Profile</h2>
          <p className="card-subtitle">Your account information.</p>

          <div className="settings-field">
            <label htmlFor="settings-name">Full name</label>
            <input
              id="settings-name"
              type="text"
              value={settings.name}
              onChange={(e) => handleField('name', e.target.value)}
            />
          </div>

          <div className="settings-field">
            <label htmlFor="settings-email">Email</label>
            <input
              id="settings-email"
              type="email"
              value={settings.email}
              onChange={(e) => handleField('email', e.target.value)}
            />
          </div>

          <div className="settings-field">
            <label htmlFor="settings-role">Role</label>
            <select
              id="settings-role"
              value={settings.role}
              onChange={(e) => handleField('role', e.target.value)}
            >
              <option>Administrator</option>
              <option>Manager</option>
              <option>Analyst</option>
              <option>Support</option>
            </select>
          </div>
        </article>

        <article className="card settings-card">
          <h2 className="card-title">Notifications</h2>
          <p className="card-subtitle">Choose what you want to be notified about.</p>

          <div className="settings-toggle-row">
            <div>
              <p className="settings-toggle-label">Email alerts</p>
              <p className="settings-toggle-desc">
                Get notified by email for critical account activity.
              </p>
            </div>
            <button
              type="button"
              className={`toggle-switch ${settings.emailAlerts ? 'on' : ''}`}
              onClick={() => toggleField('emailAlerts')}
              aria-pressed={settings.emailAlerts}
              aria-label="Toggle email alerts"
            >
              <span className="toggle-knob" />
            </button>
          </div>

          <div className="settings-toggle-row">
            <div>
              <p className="settings-toggle-label">Weekly summary report</p>
              <p className="settings-toggle-desc">
                Receive a performance digest every Monday.
              </p>
            </div>
            <button
              type="button"
              className={`toggle-switch ${settings.weeklyReport ? 'on' : ''}`}
              onClick={() => toggleField('weeklyReport')}
              aria-pressed={settings.weeklyReport}
              aria-label="Toggle weekly summary report"
            >
              <span className="toggle-knob" />
            </button>
          </div>

          <div className="settings-toggle-row">
            <div>
              <p className="settings-toggle-label">Order status updates</p>
              <p className="settings-toggle-desc">
                Notify me when an order changes status.
              </p>
            </div>
            <button
              type="button"
              className={`toggle-switch ${settings.orderUpdates ? 'on' : ''}`}
              onClick={() => toggleField('orderUpdates')}
              aria-pressed={settings.orderUpdates}
              aria-label="Toggle order status updates"
            >
              <span className="toggle-knob" />
            </button>
          </div>
        </article>

        <article className="card settings-card">
          <h2 className="card-title">Preferences</h2>
          <p className="card-subtitle">
            Display preferences applied across the dashboard.
          </p>

          <div className="settings-field">
            <label htmlFor="settings-currency">Currency</label>
            <select
              id="settings-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {Object.keys(CURRENCIES).map((code) => (
                <option key={code} value={code}>
                  {code} ({CURRENCIES[code].symbol})
                </option>
              ))}
            </select>
          </div>
          <p className="settings-toggle-desc">
            Applied instantly to amounts on Orders, Products, and Recent
            Transactions.
          </p>
        </article>

        <div className="settings-actions">
          {saved && (
            <span className="settings-saved-msg">
              <i className="bi bi-check-circle-fill" aria-hidden="true" /> Settings
              saved
            </span>
          )}
          <button type="submit" className="topbar-btn">
            Save changes
          </button>
        </div>
      </form>
    </>
  );
}
