import { Lightbulb, ShoppingBag, TrendingDown, TrendingUp } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { getInsights } from '../../utils/helpers';

const InsightItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span className="w-9 h-9 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 text-indigo-600 dark:text-indigo-200 grid place-items-center shadow-soft">
      <Icon className="w-4 h-4" />
    </span>
    <div className="space-y-0.5">
      <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  </div>
);

const InsightsSection = () => {
  const { transactions } = useStore();
  const insights = getInsights(transactions);

  return (
    <div className="section-card card-hover p-5 lg:p-6 bg-gradient-to-r from-indigo-50 via-white to-emerald-50 dark:from-indigo-950/40 dark:via-slate-950 dark:to-emerald-950/30 border-indigo-100/60 dark:border-indigo-900/50">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-200">Automated Insights</p>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Where your money is moving</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Signals generated from your last 90 days.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/70 border border-indigo-100 dark:border-indigo-900 text-xs text-indigo-700 dark:text-indigo-100">
          <Lightbulb className="w-4 h-4" />
          Live
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightItem icon={ShoppingBag} label="Highest Category" value={insights.highestCategory} />
        <InsightItem icon={TrendingDown} label="Largest Expense" value={insights.biggestExpense} />
        <InsightItem icon={TrendingUp} label="Best Saving Month" value={insights.bestSavingMonth} />
        <InsightItem icon={Lightbulb} label="Recommendation" value={insights.tip} />
      </div>
    </div>
  );
};

export default InsightsSection;
