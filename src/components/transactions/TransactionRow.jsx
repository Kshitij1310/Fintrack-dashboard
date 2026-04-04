import { Pencil, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Badge from '../ui/Badge';
import { formatDate, formatCurrency, getCategoryColor, getCategoryIcon } from '../../utils/helpers';

const statusTone = {
  Cleared: { tone: 'success', dot: 'bg-emerald-500' },
  Pending: { tone: 'warning', dot: 'bg-amber-500' },
  Review: { tone: 'info', dot: 'bg-indigo-500' },
};

const getStatus = (transaction) => {
  if (transaction.type === 'Income') return 'Cleared';
  if (transaction.amount > 4000) return 'Pending';
  return 'Review';
};

const TransactionRow = ({ transaction }) => {
  const { role, deleteTransaction, setSelectedTransaction } = useStore();
  const CategoryIcon = getCategoryIcon(transaction.category);
  const status = getStatus(transaction);
  const tone = statusTone[status] || statusTone.Cleared;

  const onDelete = () => {
    if (window.confirm('Delete this transaction?')) {
      deleteTransaction(transaction.id);
    }
  };

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-colors">
      <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300">{formatDate(transaction.date)}</td>
      <td className="px-4 py-3.5">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{transaction.title}</p>
        {transaction.note && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{transaction.note}</p>}
      </td>
      <td className="px-4 py-3.5">
        <Badge
          label={
            <span className="flex items-center gap-1.5">
              <CategoryIcon className="w-4 h-4" />
              {transaction.category}
            </span>
          }
          tone={getCategoryColor(transaction.category)}
        />
      </td>
      <td className="px-4 py-3.5">
        <Badge label={transaction.type} tone={transaction.type === 'Income' ? 'success' : 'danger'} />
      </td>
      <td className="px-4 py-3.5">
        <Badge label={status} tone={tone.tone} dot={tone.dot} />
      </td>
      <td className="px-4 py-3.5 text-sm font-semibold text-right whitespace-nowrap">
        <span
          className={
            transaction.type === 'Income' ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'
          }
        >
          {transaction.type === 'Income' ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </span>
      </td>
      {role === 'admin' && (
        <td className="px-4 py-3.5 text-right">
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setSelectedTransaction(transaction)}
              className="px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-200 hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-200"
              aria-label="Edit transaction"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-rose-500 hover:border-rose-300 hover:bg-rose-50/70 dark:hover:border-rose-500/40 dark:hover:bg-rose-500/10"
              aria-label="Delete transaction"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default TransactionRow;
