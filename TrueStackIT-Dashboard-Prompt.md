# TrueStackIT — Admin & Client Dashboard Build Prompt

Use this as a build spec / prompt for an AI coding assistant (or as your own checklist) inside the **TrueStackIT** project. It describes building two dashboards to the same quality bar as a reference build (a React "Business Admin Dashboard" that was taken from a basic starter to a fully-featured, production-quality app). Every feature listed below must be **real and interactive**, not a visual placeholder — this is the standard the reference build was held to.

## Goal

Build two separate dashboards inside TrueStackIT:

1. **Admin Dashboard** — internal panel for TrueStackIT to manage the business (clients, projects/orders, services, reports).
2. **Client Dashboard** — a portal for TrueStackIT's clients to track their own projects, invoices, and support requests.

Both should feel like the same product family: same design system, same shared components, same level of polish.

## Tech Stack

- React 19 + Vite
- React Router DOM 7 (`HashRouter` if deploying to static hosting with no server-side rewrites, e.g. GitHub Pages; `BrowserRouter` if on a real Node/Vercel/Next host)
- Recharts for charts
- Framer Motion for animation/transitions
- Bootstrap Icons via CDN (no emoji icons anywhere)
- CSS custom properties for theming (light + dark mode), modular per-component stylesheets aggregated through one `index.css`
- Context API using the split pattern: raw context file / Provider component file / consumer hook file (keeps the `react-refresh/only-export-components` ESLint rule happy)
- Start with a mock data/API layer (plain JS modules simulating async fetches) so the UI can be fully built and demoed before the real backend is wired in

## Design System

- Light, trustworthy palette: soft gray-blue body background, white cards, deep navy-to-blue gradient sidebar, blue accent color (`#2563eb` range)
- Full dark-mode variable set, toggle in the top bar, persisted to `localStorage`
- Consistent radius/shadow/spacing tokens as CSS variables
- Bootstrap Icons throughout
- Fully responsive: desktop, tablet, and mobile — including a **working** hamburger menu that slides the sidebar in as an overlay on small screens (don't just `display: none` the sidebar with no way to reopen it — that's a real bug to avoid)

## Shared Platform Features (both dashboards)

- Top bar global search: keyboard navigation (arrow keys, Enter, Escape), matched-text highlighting, a clear button
- Notifications bell: unread-count badge, dropdown list, mark-all-as-read
- Profile menu: avatar dropdown with profile/settings shortcuts and a sign-out flow
- Dark/light theme toggle
- Command palette (Ctrl/Cmd+K): quick navigation to any page + quick actions
- Keyboard shortcuts help modal (e.g. triggered by `?`)
- Toast notification system for action feedback (saved, added, generated, etc.)
- Every data table: sortable columns, real pagination (not scroll-only), CSV export
- Row-click detail drawers (slide-over side panel) for quick-look details instead of full navigation
- Bulk select + bulk actions on list tables where it makes sense (export selected, bulk status update)
- Settings page: profile fields, notification toggles, a currency/locale selector that live-updates amounts everywhere in the app
- A real 404 page (no silent redirects on unknown routes)
- Route-based code splitting with `React.lazy` + `Suspense` to keep the initial bundle lean
- Clean ESLint pass and a verified production build after every major phase

## Admin Dashboard — Pages

1. **Dashboard (overview)** — stat cards, a sales/revenue chart pair, a recent-activity feed with a "view all" link to a full activity log page, a recent-transactions widget, a category/segment breakdown widget, and an alerts-style widget relevant to TrueStackIT (e.g. overdue invoices, projects at risk).
2. **Clients** — sortable + paginated table, search/filter by status, click a row to open a client detail drawer.
3. **Projects / Orders** *(use whatever TrueStackIT actually calls a unit of work — projects, service requests, subscriptions)* — searchable + filterable + paginated table, bulk actions, status pills, and a detail drawer with a status timeline.
4. **Services / Products catalog** — category filter chips, availability/stock-style status, an "add new" modal, CSV export.
5. **Reports** — report history table, a "generate new report" flow that appends a real row to the table, type filtering.
6. **Activity Log** — full paginated/filterable event history (linked from the dashboard widget's "view all").
7. **Settings** — profile, notification toggles, currency/locale selector, team members/roles if relevant.

## Client Dashboard — Pages

*(Adjust names to match TrueStackIT's real client-facing offering, but this is the suggested structure:)*

1. **My Dashboard** — summary cards (active projects, open invoices, open support tickets, next milestone/deadline), a simple progress or timeline chart.
2. **My Projects** — status of ongoing work with TrueStackIT, a detail drawer with a project timeline.
3. **Invoices / Billing** — table of invoices with payment-status pills, CSV/PDF export.
4. **Support / Tickets** — ticket list + a "create new ticket" flow, status tracking.
5. **Profile / Settings** — personal info, notification preferences, currency/locale (structure this so it's easy to wire to real auth later, even if it's a demo for now).

## Non-Functional Requirements

- Everything must be genuinely interactive — no dead buttons or fake-looking placeholders.
- Run lint + a production build after each major phase; zero errors before calling it done.
- Finish with a README that has real screenshots, a features list, tech stack, and setup/deploy instructions.

## How to Work

Build it iteratively, page by page and feature by feature — same way the reference build was done: research the existing code first, make real functional additions (not just styling), verify with lint/build after each phase, and confirm scope with the user before touching unrelated parts of the existing TrueStackIT codebase.
