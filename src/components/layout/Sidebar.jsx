import { NavLink, useLocation } from 'react-router-dom';
import { BarChart2, ChevronLeft, ChevronRight, LayoutDashboard, PieChart, Settings, Table2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: Table2 },
  { to: '/insights', label: 'Insights', icon: BarChart2 },
  { to: '/reports', label: 'Reports', icon: PieChart },
  { to: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ isOpen, isCollapsed = false, onClose, onCollapseToggle }) => {
  const { pathname } = useLocation();
  const { filters, setFilters } = useStore();

  const baseClasses =
    'relative flex items-center gap-2.5 px-3 py-2 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-500/60';
  const computedCollapsed = isCollapsed;

  const renderNav = (item) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to}
        to={item.disabled ? '#' : item.to}
        onClick={() => {
          if (!item.disabled) onClose?.();
        }}
        className={({ isActive }) => {
          const active = isActive;
          const stateClasses = active
            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-100 border border-indigo-100 dark:border-indigo-900'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-900/70';
          return `${baseClasses} group ${stateClasses} ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
        }}
        aria-disabled={item.disabled || undefined}
        tabIndex={item.disabled ? -1 : undefined}
      >
        {({ isActive }) => (
          <>
            <span className="relative flex items-center">
              <span
                className={`absolute -left-3 top-1 bottom-1 w-1 rounded-full transition-all duration-200 ${
                  isActive ? 'bg-indigo-500 shadow-soft' : 'bg-transparent group-hover:bg-indigo-200'
                }`}
              />
              <span
                className={`w-9 h-9 grid place-items-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-100 ${
                  computedCollapsed ? 'mx-auto' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </span>
            </span>
            {!computedCollapsed && <span className="text-sm font-semibold">{item.label}</span>}
          </>
        )}
      </NavLink>
    );
  };

  const showFilters = pathname === '/transactions' && !computedCollapsed;

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-40 w-[240px] bg-white/95 dark:bg-slate-950/95 border-r border-slate-200 dark:border-slate-900 shadow-[0_10px_40px_rgba(15,23,42,0.08)] transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 ${computedCollapsed ? 'md:w-[96px]' : 'md:w-[240px]'}`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/80 dark:border-slate-900/70">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-400 text-white grid place-items-center font-semibold shadow-soft">
              FT
            </div>
            {!computedCollapsed && (
              <div className="leading-tight">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Fintrack</p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Console</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onCollapseToggle}
              className="hidden md:inline-flex p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 dark:hover:text-indigo-100 dark:hover:border-indigo-600 transition"
              aria-label={computedCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {computedCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="px-3 py-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)]">
          <div className="space-y-1">{navItems.map(renderNav)}</div>

          {showFilters && (
            <div className="mt-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/70">
              <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-2">
                Quick Category
              </p>
              <div className="grid grid-cols-2 gap-2">
                {['Food', 'Shopping', 'Bills', 'Transport'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilters({ category: cat })}
                    className={`text-xs px-3 py-2 rounded-lg border transition ${
                      filters.category === cat
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-100'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-200 dark:hover:border-indigo-500/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <button
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-label="Close sidebar overlay"
        />
      )}
    </>
  );
};

export default Sidebar;
