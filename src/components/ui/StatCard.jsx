import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const palettes = {
  indigo: 'from-indigo-50 via-white to-slate-50 dark:from-indigo-950/50 dark:via-slate-950 dark:to-slate-900',
  emerald: 'from-emerald-50 via-white to-slate-50 dark:from-emerald-900/40 dark:via-slate-950 dark:to-slate-900',
  rose: 'from-rose-50 via-white to-slate-50 dark:from-rose-900/35 dark:via-slate-950 dark:to-slate-900',
  violet: 'from-violet-50 via-white to-slate-50 dark:from-violet-900/35 dark:via-slate-950 dark:to-slate-900',
};

const iconBg = {
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-100',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-100',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-100',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-100',
};

const StatCard = ({ title, value, icon: Icon, trend = 'up', trendValue, insight, color = 'indigo' }) => {
  const TrendIcon = trend === 'down' ? ArrowDownRight : ArrowUpRight;
  const trendTone =
    trend === 'down'
      ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-100'
      : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-100';

  return (
    <div
      className={`section-card card-hover p-4 lg:p-5 flex flex-col gap-3 bg-gradient-to-br ${
        palettes[color] || palettes.indigo
      }`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl grid place-items-center shadow-inner ${iconBg[color] || iconBg.indigo}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        {trendValue && (
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold ${trendTone}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            {trendValue}
          </span>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <p className="text-3xl lg:text-[30px] font-semibold text-slate-900 dark:text-white metric-value">{value}</p>
      </div>

      {insight && <p className="text-sm text-slate-600 dark:text-slate-300">{insight}</p>}
    </div>
  );
};

export default StatCard;
