import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Badge from '../ui/Badge';
import { formatCurrency, formatDate, getCategoryColor, getCategoryIcon } from '../../utils/helpers';

const statusTone = {
  Cleared: { tone: 'success', dot: 'bg-emerald-500' },
  Pending: { tone: 'warning', dot: 'bg-amber-500' },
  Review: { tone: 'info', dot: 'bg-indigo-500' },
};

const getStatus = (transaction, index) => {
  if (transaction.type === 'Income') return 'Cleared';
  if (transaction.amount > 4000) return 'Pending';
  return index % 2 === 0 ? 'Review' : 'Cleared';
};

const RecentTransactions = () => {
  const { transactions } = useStore();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return transactions
      .filter((t) => !q || t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  return (
    <div className="section-card card-hover p-5 lg:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Ledger</p>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recent Transactions</h3>
        </div>
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search merchant or category"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-slate-700 dark:text-slate-200">
          <thead className="bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Merchant</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((t, idx) => {
              const CategoryIcon = getCategoryIcon(t.category);
              const status = getStatus(t, idx);
              const tone = statusTone[status] || statusTone.Cleared;

              return (
                <tr
                  key={t.id}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-colors"
                >
                  <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300">{formatDate(t.date)}</td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.title}</p>
                    {t.note && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.note}</p>}
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge
                      label={
                        <span className="flex items-center gap-1.5">
                          <CategoryIcon className="w-4 h-4" />
                          {t.category}
                        </span>
                      }
                      tone={getCategoryColor(t.category)}
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge label={status} tone={tone.tone} dot={tone.dot} />
                  </td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-right whitespace-nowrap">
                    <span
                      className={
                        t.type === 'Income'
                          ? 'text-emerald-600 dark:text-emerald-300'
                          : 'text-rose-600 dark:text-rose-300'
                      }
                    >
                      {t.type === 'Income' ? '+' : '-'}
                      {formatCurrency(t.amount)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <button
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Page {page} / {totalPages}
        </span>
        <button
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentTransactions;
