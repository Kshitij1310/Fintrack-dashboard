const base =
  'inline-flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed leading-tight';

const variants = {
  primary:
    'bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 text-white shadow-soft hover:shadow-glow focus:ring-indigo-300 dark:from-indigo-500 dark:via-blue-500 dark:to-sky-400',
  secondary:
    'bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
  subtle:
    'bg-transparent text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500',
  danger: 'bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-300',
};

const sizes = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
};

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
  >
    {children}
  </button>
);

export default Button;
