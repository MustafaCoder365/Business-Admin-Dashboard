# 📊 Business Admin Dashboard

A modern, fully responsive **Business Admin Dashboard** built with **React**, **Recharts**, and **Framer Motion**. This dashboard provides analytics, charts, user and order management tools, and a clean dark UI inspired by enterprise-grade systems.

## 🌍 Live Demo

🔗 https://mustafacoder365.github.io/Business-Admin-Dashboard/

## ✨ Features

- 📈 Real-time-style analytics: monthly sales (line chart) and quarterly revenue (bar chart) powered by Recharts
- 🗂 Multi-page navigation: Dashboard, Users, Orders, Products, Reports, Settings
- 👤 User management — sortable, paginated table with search by name/country, status filtering, CSV export
- 🧾 Order management — sortable, paginated order table, status filtering, CSV export, and a click-to-open detail drawer with a status timeline
- 📦 Products & Categories page — catalog with category filter chips, stock levels, low-stock/out-of-stock badges, an "Add Product" form, and CSV export
- 📊 Reports page — report history table, type filtering, and a "New Report" generator that appends real rows to the list
- 🧩 Extra dashboard widgets — "Sales by Category" progress bars, a "Recent Transactions" feed, and a "Low Stock Alerts" widget
- 🔔 Notifications center — bell dropdown with unread badge and mark-all-read
- 👤 Profile menu — quick access to profile/settings and a demo sign-out flow
- 🌗 Dark / light theme toggle, persisted to localStorage
- ⌨️ Command palette (Ctrl/Cmd + K) for instant navigation and quick actions
- ⚙️ Functional Settings page — editable profile, notification toggles, persisted to localStorage
- 🔍 Global search in the topbar — keyboard navigation, match highlighting, and a clear button, instantly jump to users or orders
- 🎨 Trustworthy white/blue enterprise theme (with a dark mode) and Bootstrap Icons throughout
- 🕒 Activity feed with categorized indicators (info, warning, success)
- 🎬 Smooth animations throughout (cards, hover effects, modals, drawer) via Framer Motion
- 📱 Fully responsive — optimized for desktop, tablet, and mobile
- ⚡ Route-based code splitting for a lean initial bundle

## 🛠 Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router DOM 7](https://reactrouter.com/) (HashRouter, GitHub Pages-ready)
- [Recharts](https://recharts.org/) — data visualization
- [Framer Motion](https://www.framer.com/motion/) — animation
- [Bootstrap Icons](https://icons.getbootstrap.com/) — iconography
- Modular CSS architecture (per-component stylesheets, CSS variables)
- Mock API layer simulating async data fetching

## 📸 Screenshots

| Dashboard | Users |
|-----------|-------|
| _add screenshot_ | _add screenshot_ |

| Orders | Products |
|--------|----------|
| _add screenshot_ | _add screenshot_ |

| Reports | Settings |
|---------|----------|
| _add screenshot_ | _add screenshot_ |

| Command Palette | Dark Mode |
|------------------|-----------|
| _add screenshot_ | _add screenshot_ |

## 📂 Project Structure

```
business-insights-dashboard/
├── public/
├── src/
│   ├── api/
│   │   └── mockApi.js
│   ├── components/
│   │   ├── ActivityFeed.jsx
│   │   ├── AddProductModal.jsx
│   │   ├── CategoryBreakdown.jsx
│   │   ├── ChartsRow.jsx
│   │   ├── CommandPalette.jsx
│   │   ├── Layout.jsx
│   │   ├── LowStockWidget.jsx
│   │   ├── NewReportModal.jsx
│   │   ├── NotificationsBell.jsx
│   │   ├── OrderDetailDrawer.jsx
│   │   ├── OverviewCards.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProfileMenu.jsx
│   │   ├── RecentTransactions.jsx
│   │   ├── RevenueChart.jsx
│   │   ├── SalesChart.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SortableHeader.jsx
│   │   ├── StatCard.jsx
│   │   ├── Topbar.jsx
│   │   └── UsersTable.jsx
│   ├── context/
│   │   ├── theme-context.js
│   │   ├── ThemeContext.jsx
│   │   └── useTheme.js
│   ├── data/
│   │   ├── activity.js
│   │   ├── categories.js
│   │   ├── notifications.js
│   │   ├── orders.js
│   │   ├── productCategories.js
│   │   ├── products.js
│   │   ├── reports.js
│   │   ├── revenue.js
│   │   ├── sales.js
│   │   ├── stats.js
│   │   └── users.js
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ReportsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── UsersPage.jsx
│   ├── utils/
│   │   ├── csv.js
│   │   └── useSortableData.js
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
└── README.md
```

## 🚀 Installation

```bash
git clone https://github.com/MustafaCoder365/Business-Admin-Dashboard.git
cd Business-Admin-Dashboard
npm install
npm run dev
```

## 📦 Deployment (GitHub Pages)

Preconfigured with `gh-pages` and `HashRouter` for reliable routing on GitHub Pages:

```bash
npm run deploy
```

## 👤 Author

**Mustafa Shakir**
- 🌐 GitHub: https://github.com/MustafaCoder365
- 💼 LinkedIn: https://www.linkedin.com/in/mustafa-shakir-840374330
- 📧 Email: mustafa1997670@gmail.com
