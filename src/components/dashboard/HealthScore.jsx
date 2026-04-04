import { ShieldCheck, Activity, CheckCircle } from 'lucide-react';

const HealthScore = ({ score = 92, status = 'Healthy', delta = '+3.2%' }) => {
  const clamped = Math.min(100, Math.max(0, score));
  const angle = (clamped / 100) * 360;

  return (
    <div className="section-card card-hover p-5 lg:p-6 h-full bg-gradient-to-br from-emerald-50 via-white to-indigo-50 dark:from-emerald-950/40 dark:via-slate-950 dark:to-indigo-950/30">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-200">Financial Health</p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Health Score</h3>
        </div>
        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-100 border border-emerald-200/80 dark:border-emerald-700/50">
          <CheckCircle className="w-3.5 h-3.5" /> {delta} vs last month
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div
          className="relative w-28 h-28 rounded-full grid place-items-center"
          style={{
            background: `conic-gradient(#10b981 ${angle}deg, rgba(226,232,240,0.8) ${angle}deg)`,
          }}
        >
          <div className="absolute inset-3 rounded-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid place-items-center shadow-inner">
            <div className="text-center">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white metric-value">{clamped}%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{status}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 flex-1">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5" />
            <p>Cash runway covers 3 months of average expenses.</p>
          </div>
          <div className="flex items-start gap-2">
            <Activity className="w-4 h-4 text-indigo-500 mt-0.5" />
            <p>Income stability is strong with consistent monthly inflows.</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-sky-500 mt-0.5" />
            <p>Spending efficiency improved with a tighter savings rate.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScore;
