import LineChart from '../components/dashboard/LineChart';
import BarChart from '../components/dashboard/BarChart';
import PieChart from '../components/dashboard/PieChart';
import InsightsSection from '../components/dashboard/InsightsSection';

const Insights = () => (
  <div className="space-y-5 lg:space-y-6">
    <header className="space-y-1">
      <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Financial Intelligence</p>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Insights</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Spending trends, category breakdowns, weekly analysis, and savings signals.
      </p>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
      <div className="lg:col-span-2">
        <LineChart />
      </div>
      <div className="lg:col-span-1">
        <div className="section-card card-hover h-full p-4 lg:p-5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Weekly Expense Analysis</p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Spend Pulse</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Weekly snapshot highlighting expense momentum and cash discipline. Use the categories chart to pinpoint leaks, then
            track the balance line to see if savings trend aligns.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
            <li>Monitor weekly expense spikes vs. prior weeks.</li>
            <li>Cross-check category share to locate drivers.</li>
            <li>Confirm balance trajectory stays positive.</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
      <BarChart />
      <PieChart />
    </div>

    <InsightsSection />
  </div>
);

export default Insights;
