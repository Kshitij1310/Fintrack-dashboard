import { Search, ArrowUpDown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Button from '../ui/Button';
import { CATEGORIES, TRANSACTION_TYPES } from '../../constants';

const TransactionFilters = () => {
  const { filters, setFilters, resetFilters } = useStore();

  const handleChange = (key, value) => setFilters({ [key]: value });

  const toggleOrder = () =>
    setFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });

  return (
    <div className="section-card card-hover p-4 lg:p-5 space-y-4 bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" aria-hidden />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Search title or note"
            aria-label="Search transactions by title or note"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 dark:text-slate-400">Sort</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <button
            onClick={toggleOrder}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:border-indigo-300 flex items-center gap-1"
            aria-label={`Toggle sort order (current ${filters.sortOrder === 'asc' ? 'ascending' : 'descending'})`}
          >
            <ArrowUpDown className={`w-4 h-4 transition ${filters.sortOrder === 'asc' ? 'rotate-180' : ''}`} />
            <span className="text-[11px] font-semibold uppercase text-slate-500 dark:text-slate-400">
              {filters.sortOrder === 'asc' ? 'Asc' : 'Desc'}
            </span>
          </button>
          <Button variant="secondary" size="sm" onClick={resetFilters}>Reset</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="md:col-span-2">
          <label className="block text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-1">Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All</option>
            {TRANSACTION_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-1">Date From</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleChange('dateFrom', e.target.value)}
            className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-1">Date To</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleChange('dateTo', e.target.value)}
            className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
