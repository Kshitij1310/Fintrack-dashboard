import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useStore } from '../../store/useStore';
import { getMonthlyData, formatCurrency } from '../../utils/helpers';
import EmptyState from '../ui/EmptyState';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const income = payload.find((p) => p.dataKey === 'income')?.value || 0;
  const expense = payload.find((p) => p.dataKey === 'expense')?.value || 0;
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-3 py-2 shadow-soft text-sm">
      <p className="font-semibold text-slate-800 dark:text-slate-100">{label}</p>
      <p className="text-emerald-600 dark:text-emerald-200">Income: {formatCurrency(income)}</p>
      <p className="text-rose-600 dark:text-rose-200">Expense: {formatCurrency(expense)}</p>
    </div>
  );
};

const BarChart = () => {
  const { transactions } = useStore();
  const data = getMonthlyData(transactions);
  const hasData = data.some((d) => d.income || d.expense);

  return (
    <div className="section-card card-hover overflow-hidden p-5 h-[320px] bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Monthly</p>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Income vs Expense (6m)</h3>
        </div>
        <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
          INR
        </span>
      </div>
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <RBarChart data={data} margin={{ left: 0, right: 8, top: 12, bottom: 8 }}>
            <CartesianGrid strokeDasharray="2 6" stroke="rgba(148, 163, 184, 0.2)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={{ stroke: 'rgba(148,163,184,0.4)' }}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(37,99,235,0.06)' }} />
            <Legend wrapperStyle={{ paddingTop: 8 }} />
            <Bar dataKey="income" fill="#10b981" radius={[10, 10, 6, 6]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[10, 10, 6, 6]} />
          </RBarChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState message="No monthly data yet. Add transactions to compare income and expenses." />
      )}
    </div>
  );
};

export default BarChart;
