const EmptyState = ({ message, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 dark:text-slate-400">
    {Icon && <Icon className="w-10 h-10 mb-3 text-slate-400 dark:text-slate-500" />}
    <p className="text-sm font-medium">{message}</p>
  </div>
);

export default EmptyState;
