import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Bell,
  ChevronDown,
  Check,
  Menu,
  Moon,
  Search,
  Sun,
  UserRound,
  Wallet,
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'viewer', label: 'Viewer' },
];

const Navbar = ({ onMenuToggle }) => {
  const { pathname } = useLocation();
  const { darkMode, toggleDarkMode, role, setRole, filters, setFilters } = useStore();
  const [roleOpen, setRoleOpen] = useState(false);

  const pageTitleMap = {
    '/': 'Dashboard',
    '/transactions': 'Transactions',
    '/insights': 'Insights',
    '/reports': 'Reports',
    '/settings': 'Settings',
  };
  const pageTitle = pageTitleMap[pathname] || 'Dashboard';
  const roleLabel = roleOptions.find((r) => r.value === role)?.label || 'Viewer';

  const handleRoleChange = (next) => {
    setRole(next);
    setRoleOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        <button
          className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 text-white grid place-items-center shadow-soft">
            <Wallet className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Fintrack OS</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{pageTitle}</p>
          </div>
        </div>

        <div className="flex-1 hidden md:flex max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" aria-hidden />
            <input
              type="text"
              aria-label="Global transaction search"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              placeholder="Search transactions, merchants, or categories"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-500/60 hover:text-indigo-600 dark:hover:text-indigo-200 transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-200 hover:border-indigo-300 dark:hover:border-indigo-500/60 hover:text-indigo-600 dark:hover:text-indigo-200 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setRoleOpen((o) => !o)}
              className="h-10 inline-flex items-center gap-2 pl-3 pr-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:border-indigo-300 dark:hover:border-indigo-500/60 transition"
              aria-haspopup="listbox"
              aria-expanded={roleOpen}
              aria-label={`Current role ${roleLabel}. Click to change role.`}
            >
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 text-white grid place-items-center shadow-soft">
                <UserRound className="w-4 h-4" />
              </span>
              <span>{roleLabel}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition ${roleOpen ? 'rotate-180' : ''}`} />
            </button>
            {roleOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft animate-fade-in overflow-hidden">
                {roleOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleRoleChange(opt.value)}
                    className={`w-full px-3.5 py-2.5 flex items-center justify-between text-sm transition ${
                      role === opt.value
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-100'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <UserRound className="w-4 h-4" />
                      {opt.label}
                    </span>
                    {role === opt.value && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 via-blue-500 to-emerald-400 text-white grid place-items-center font-semibold shadow-soft select-none">
            AK
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
