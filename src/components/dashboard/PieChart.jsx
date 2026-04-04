import { PieChart as RPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Label } from 'recharts';
import { useStore } from '../../store/useStore';
import { getCategoryData, formatCurrency } from '../../utils/helpers';
import EmptyState from '../ui/EmptyState';

const CenterLabel = ({ viewBox, total }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 6} textAnchor="middle" className="fill-slate-800 dark:fill-slate-100 text-sm font-semibold">
        Total Expenses
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        className="fill-indigo-600 dark:fill-indigo-300 text-xs font-semibold"
      >
        {formatCurrency(total)}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-3 py-2 shadow-soft text-sm">
      <p className="font-semibold text-slate-800 dark:text-slate-100">{name}</p>
      <p className="text-slate-600 dark:text-slate-300">{formatCurrency(value)}</p>
    </div>
  );
};

const PieChart = () => {
  const { transactions } = useStore();
  const data = getCategoryData(transactions);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const hasData = data.length > 0;

  return (
    <div className="section-card card-hover overflow-hidden p-5 h-[320px] bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Breakdown</p>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Expense by Category</h3>
        </div>
      </div>
      {hasData ? (
        <ResponsiveContainer width="100%" height="100%">
          <RPieChart margin={{ bottom: 40 }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={108}
              paddingAngle={2}
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} className="transition-transform duration-200" />
              ))}
              <Label content={(props) => <CenterLabel {...props} total={total} />} position="center" />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ paddingTop: 10, fontSize: 12, lineHeight: '18px' }}
            />
          </RPieChart>
        </ResponsiveContainer>
      ) : (
        <EmptyState message="No expenses logged. Track spending to see category split." />
      )}
    </div>
  );
};

export default PieChart;
