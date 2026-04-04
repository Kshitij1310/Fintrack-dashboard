import { useMemo } from 'react';
import {
  LineChart as RLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useStore } from '../../store/useStore';
import { formatCurrency, formatDate } from '../../utils/helpers';
import EmptyState from '../ui/EmptyState';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-3 py-2 shadow-soft text-sm">
      <p className="font-semibold text-slate-800 dark:text-slate-100">{label}</p>
      <p className="text-indigo-600 dark:text-indigo-200">{formatCurrency(value)}</p>
    </div>
  );
};

const LineChart = () => {
  const { transactions } = useStore();

  const data = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let balance = 0;
    return sorted.map((t) => {
      balance += t.type === 'Income' ? Number(t.amount) : -Number(t.amount);
      return {
        date: formatDate(t.date),
        balance,
      };
    });
  }, [transactions]);

  const hasData = data.length > 0;

  return (
    <div className="section-card card-hover overflow-hidden p-5 lg:p-6 h-[360px] bg-gradient-to-br from-slate-50 via-white to-indigo-50/50 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/30">
      <div className="flex items-center justify-between mb-4 lg:mb-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Trend</p>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Cumulative Balance</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Daily net balance across accounts</p>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">
          INR • Live
        </div>
      </div>
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <RLineChart data={data} margin={{ left: 0, right: 12, top: 12, bottom: 6 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.32} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 8" stroke="rgba(148, 163, 184, 0.18)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              interval="preserveStartEnd"
              axisLine={{ stroke: 'rgba(148,163,184,0.4)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2563eb', strokeDasharray: '4 4', strokeOpacity: 0.2 }} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: '#2563eb' }}
              fill="url(#balanceGradient)"
            />
          </RLineChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState message="No transactions yet. Add some to see your balance trend." />
      )}
    </div>
  );
};

export default LineChart;
