const toneStyles = {
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100',
  success: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-100',
  danger: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-100',
  warning: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-100',
  info: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-100',
  subtle: 'bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-200',
};

const Badge = ({ label, tone = 'neutral', className = '', dot }) => {
  const palette = toneStyles[tone] || tone;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${palette} ${className}`}
    >
      {dot && <span className={`w-2 h-2 rounded-full ${dot}`} aria-hidden />}
      {label}
    </span>
  );
};

export default Badge;
