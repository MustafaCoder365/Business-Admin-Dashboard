export default function Topbar() {
  return (
    <header className="topbar">
      <div>
        <h1 className="topbar-title">Business Admin Dashboard</h1>
        <p className="topbar-subtitle">Overview of your platform performance</p>
      </div>
      <div className="topbar-actions">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          aria-label="Search"
        />
        <button className="topbar-btn">+ New Report</button>
      </div>
    </header>
  );
}
