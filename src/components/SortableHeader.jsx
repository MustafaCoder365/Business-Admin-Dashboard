export default function SortableHeader({ label, sortKey, activeKey, dir, onSort }) {
  const isActive = sortKey === activeKey;

  return (
    <th
      className="sortable-th"
      onClick={() => onSort(sortKey)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSort(sortKey);
        }
      }}
    >
      <span className="sortable-th-inner">
        {label}
        <i
          className={`bi ${
            isActive
              ? dir === 'asc'
                ? 'bi-caret-up-fill'
                : 'bi-caret-down-fill'
              : 'bi-caret-down'
          } sort-icon ${isActive ? 'active' : ''}`}
          aria-hidden="true"
        />
      </span>
    </th>
  );
}
