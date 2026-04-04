import { useEffect, useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { useStore } from '../../store/useStore';
import TransactionFilters from './TransactionFilters';
import TransactionRow from './TransactionRow';
import Pagination from './Pagination';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import { exportToCSV } from '../../utils/helpers';

const TransactionList = () => {
  const { role, filters, transactions, getFilteredTransactions } = useStore((state) => ({
    role: state.role,
    filters: state.filters,
    transactions: state.transactions,
    getFilteredTransactions: state.getFilteredTransactions,
  }));
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const filtered = useMemo(() => getFilteredTransactions(), [getFilteredTransactions, filters, transactions]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  const handleExport = () => exportToCSV(filtered);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Filters</h2>
          <div className="hidden md:flex">
            <Button variant="secondary" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </div>
        </div>
        <TransactionFilters />
      </div>

      <div className="md:hidden">
        <Button variant="secondary" onClick={handleExport} className="w-full">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="section-card card-hover overflow-hidden">
        <div className="overflow-x-auto relative">
          <table className="min-w-full text-left text-slate-700 dark:text-slate-200">
            <thead className="sticky top-0 bg-white/90 dark:bg-slate-900/85 backdrop-blur border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">
                  Date
                  <span className="ml-1 text-[10px] text-indigo-500">{filters.sortBy === 'date' ? (filters.sortOrder === 'asc' ? '▲' : '▼') : ''}</span>
                </th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">
                  Amount
                  <span className="ml-1 text-[10px] text-indigo-500">{filters.sortBy === 'amount' ? (filters.sortOrder === 'asc' ? '▲' : '▼') : ''}</span>
                </th>
                {role === 'admin' && <th className="px-4 py-3 font-semibold text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="text-sm">
              {paginated.map((t) => (
                <TransactionRow key={t.id} transaction={t} />
              ))}
            </tbody>
          </table>
        </div>
        {!paginated.length && <EmptyState message="No transactions match your filters." />}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default TransactionList;
