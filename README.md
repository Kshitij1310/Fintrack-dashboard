# Finance Dashboard UI

A responsive fintech dashboard built with React, Vite, Tailwind CSS, Recharts, and Zustand. It includes mock transaction data, role-aware UI (Admin/Viewer), rich filtering/sorting, CSV/JSON export, multi-chart visualizations, and persisted user preferences (theme, currency, notifications, profile).

## Overview
FinTrack provides an at-a-glance view of balances, income, expenses, and spending patterns. It includes interactive charts, actionable insights, a transactions workspace with full CRUD (for admins), plus exports and filtering tools.

## Tech Stack
- React 19 + Vite
- Tailwind CSS for styling
- Recharts for charts
- Zustand for state management
- React Router for navigation
- Lucide React for icons

## Features
- Dashboard with summary cards, multi-type charts, and insight cards
- Dedicated Insights page with balance trend, income vs expense, category breakdown, and weekly spend guidance
- Reports page with PDF stubs, CSV export (all or filtered), JSON export, and a financial snapshot preview
- Role-based UI: Viewer (read-only) and Admin (add/edit/delete)
- Transactions table with search, filters, sorting, pagination, CSV export
- Modal-driven transaction form with validation
- Dark/light mode toggle, persisted
- Settings: profile editing (name/email), currency preference (affects formatting), notification preferences, export/reset controls

## Dashboard
- **Summary Cards** (`SummaryCards.jsx`): Total Balance, Income, Expenses, Savings Rate (with trends from recent months).
- **Income vs Expense (Bar)** (`BarChart.jsx`): 6-month totals using `getMonthlyData`.
- **Cumulative Balance (Line)** (`LineChart.jsx`): Running balance over time sorted by date.
- **Expense by Category (Pie)** (`PieChart.jsx`): Expense-only breakdown with percentage labels and total in center.
- **Insights** (`InsightsSection.jsx` via `getInsights`): Highest spending category, biggest single expense, best saving month, and a context-aware tip.

## Transactions
- **List** (`TransactionList.jsx` + `TransactionRow.jsx`): Date, Title, Category, Type, Amount, Status, and admin-only actions.
- **Filters** (`TransactionFilters.jsx`): Search title/note, category, type, date range, sort by date/amount, toggle sort order, reset.
- **Pagination** (`Pagination.jsx`): Compact page builder with ellipses.
- **Exports**: CSV for all or filtered data; JSON export from Settings.
- **CRUD (Admin only)**: Add/Edit through `Modal` + `TransactionForm.jsx`; delete with confirm.

## Insights
Computed in `src/utils/helpers.js`:
- Highest spending category (sum of expenses)
- Biggest expense (single transaction)
- Best saving month (income – expense)
- Savings-rate-based tip (<20% vs healthy)

## Role-Based UI
- Role switcher in `Navbar.jsx` sets `role` in the store.
- Viewer: table is read-only; action buttons and add FAB are hidden.
- Admin: can open modal to add/edit and can delete rows.
- Note: enforcement is UI-level; store actions do not block console calls.

## State Management
- Zustand store lives in `src/store/useStore.js`.
- State: `transactions` (persisted), `filters`, `role`, `darkMode`/`theme`, `selectedTransaction`, `notifications`, `profile`, `currency`.
- Actions: add/update/delete transaction, set/reset filters, set role, toggle dark mode, select transaction.
- Selector `getFilteredTransactions` applies search, category/type, date range, and sorting; reused by list and pagination.
- Helpers in `src/utils/helpers.js` format currency/dates (using stored currency), build monthly/category datasets, compute insights, and export CSV/JSON.

## Project Structure
```
src/
├─ App.jsx                 # Layout with Navbar, Sidebar, routed pages
├─ pages/
│  ├─ Dashboard.jsx        # Summary, charts, insights
│  ├─ Transactions.jsx     # Header + list + modal trigger
│  ├─ Insights.jsx         # Financial intelligence view
│  ├─ Reports.jsx          # Exports, PDF stubs, snapshot preview
│  └─ Settings.jsx         # Profile, currency, theme, notifications, export/reset
├─ components/
│  ├─ layout/ Navbar.jsx, Sidebar.jsx
│  ├─ dashboard/ SummaryCards, BarChart, LineChart, PieChart, InsightsSection, HealthScore, RecentTransactions
│  ├─ transactions/ TransactionList, TransactionRow, TransactionForm,
│  │                 TransactionFilters, Pagination
│  └─ ui/ StatCard, Button, Badge, Modal, EmptyState
├─ store/ useStore.js      # Zustand store and selectors
├─ utils/ helpers.js       # Formatting, data transforms, insights, exports
├─ data/ mockData.js       # Seed transactions
└─ index.css               # Tailwind base + global styles
```

## Setup Instructions
1) Install dependencies: `npm install`
2) Start dev server: `npm run dev`
3) Build for production: `npm run build`
4) Preview build: `npm run preview`
5) (Optional) Run lint inside project root: `eslint src` (global scope may be blocked on some systems)

## Future Improvements
- Add API layer and persist transactions server-side.
- Enforce role permissions at the store/action layer.
- Broaden accessibility pass (focus traps for modals, aria-live for status text).
- Mobile-friendly transaction cards or horizontal scroll on small screens.
- Tests for `getFilteredTransactions`, `getInsights`, and settings persistence.
