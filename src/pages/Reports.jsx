import { Download, FileText, FileSpreadsheet, Filter, BarChart2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { exportToCSV, formatCurrency } from '../utils/helpers';
import { useStore } from '../store/useStore';

const ReportCard = ({ title, subtitle, actionLabel, onClick, icon: Icon }) => (
  <div className="section-card card-hover p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-200 grid place-items-center">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
    </div>
    <Button variant="secondary" size="sm" onClick={onClick} aria-label={actionLabel}>
      <Download className="w-4 h-4 mr-2" />
      {actionLabel}
    </Button>
  </div>
);

const Reports = () => {
  const { transactions, getFilteredTransactions } = useStore();

  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((s, t) => s + Number(t.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((s, t) => s + Number(t.amount), 0);
  const net = totalIncome - totalExpense;
  const preview = transactions.slice(0, 5);

  const downloadMonthly = () => alert('Monthly PDF download is mocked for now.');
  const downloadYearly = () => alert('Yearly PDF download is mocked for now.');
  const exportAll = () => exportToCSV(transactions);
  const exportFiltered = () => exportToCSV(getFilteredTransactions());

  return (
    <div className="space-y-5 lg:space-y-6">
      <header className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Reports & Exports</p>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Reports</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Generate investor-ready PDFs or export your transaction ledger instantly.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReportCard
          title="Download Monthly Report (PDF)"
          subtitle="Includes KPIs, charts, and insights for the last month."
          actionLabel="Download PDF"
          onClick={downloadMonthly}
          icon={FileText}
        />
        <ReportCard
          title="Download Yearly Report (PDF)"
          subtitle="Full fiscal view with aggregates and category splits."
          actionLabel="Download PDF"
          onClick={downloadYearly}
          icon={FileText}
        />
        <ReportCard
          title="Export Transactions (CSV)"
          subtitle="Complete transaction history."
          actionLabel="Export CSV"
          onClick={exportAll}
          icon={FileSpreadsheet}
        />
        <ReportCard
          title="Export Filtered Transactions"
          subtitle="Respects current filters and sorting."
          actionLabel="Export Filtered"
          onClick={exportFiltered}
          icon={Filter}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="section-card card-hover p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Summary</p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Financial snapshot</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Income</p>
              <p className="text-base font-semibold text-emerald-600 dark:text-emerald-200">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Expense</p>
              <p className="text-base font-semibold text-rose-600 dark:text-rose-200">{formatCurrency(totalExpense)}</p>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 col-span-2">
              <p className="text-xs text-indigo-700 dark:text-indigo-200">Net</p>
              <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-100">{formatCurrency(net)}</p>
            </div>
          </div>
        </div>

        <div className="section-card card-hover p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Preview</p>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent transactions (5)</h3>
            </div>
            <BarChart2 className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-slate-700 dark:text-slate-200">
              <thead>
                <tr className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  <th className="py-2 pr-3 text-left">Title</th>
                  <th className="py-2 pr-3 text-left">Category</th>
                  <th className="py-2 pr-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((t) => (
                  <tr key={t.id} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <td className="py-2 pr-3">{t.title}</td>
                    <td className="py-2 pr-3">{t.category}</td>
                    <td className="py-2 pr-3 text-right">{formatCurrency(t.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Use “Export Filtered” to download the exact set you see in Transactions.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
