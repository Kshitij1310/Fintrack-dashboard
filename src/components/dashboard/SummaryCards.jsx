import { useMemo } from 'react';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Percent } from 'lucide-react';
import { useStore } from '../../store/useStore';
import StatCard from '../ui/StatCard';
import { formatCurrency, getMonthlyData } from '../../utils/helpers';

const SummaryCards = () => {
  const { transactions } = useStore();

  const { balance, income, expense, savingsRate, incomeTrend, expenseTrend } = useMemo(() => {
    const incomeTotal = transactions.filter((t) => t.type === 'Income').reduce((s, t) => s + Number(t.amount), 0);
    const expenseTotal = transactions.filter((t) => t.type === 'Expense').reduce((s, t) => s + Number(t.amount), 0);
    const balanceTotal = incomeTotal - expenseTotal;
    const savings = incomeTotal ? ((incomeTotal - expenseTotal) / incomeTotal) * 100 : 0;

    const monthly = getMonthlyData(transactions);
    const latest = monthly[monthly.length - 1] || { income: 0, expense: 0 };
    const prev = monthly[monthly.length - 2] || { income: 0, expense: 0 };
    const incomeDiff = latest.income - prev.income;
    const expenseDiff = latest.expense - prev.expense;

    return {
      balance: balanceTotal,
      income: incomeTotal,
      expense: expenseTotal,
      savingsRate: savings,
      incomeTrend: incomeDiff,
      expenseTrend: expenseDiff,
    };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
      <StatCard
        title="Total Balance"
        value={formatCurrency(balance)}
        icon={Wallet}
        color="indigo"
        trend={balance >= 0 ? 'up' : 'down'}
        trendValue={`${balance >= 0 ? '+' : ''}${formatCurrency(balance)}`}
        insight="Cash runway and reserves, updated live."
      />
      <StatCard
        title="Total Income"
        value={formatCurrency(income)}
        icon={ArrowUpCircle}
        color="emerald"
        trend={incomeTrend >= 0 ? 'up' : 'down'}
        trendValue={`${incomeTrend >= 0 ? '+' : ''}${formatCurrency(Math.abs(incomeTrend))} vs prev`}
        insight={incomeTrend >= 0 ? 'Earnings accelerated this month.' : 'Income dipped versus last month.'}
      />
      <StatCard
        title="Total Expenses"
        value={formatCurrency(expense)}
        icon={ArrowDownCircle}
        color="rose"
        trend={expenseTrend <= 0 ? 'down' : 'up'}
        trendValue={`${expenseTrend >= 0 ? '+' : '-'}${formatCurrency(Math.abs(expenseTrend))} vs prev`}
        insight={expenseTrend <= 0 ? 'Spending cooled off.' : 'Spending trending hotter.'}
      />
      <StatCard
        title="Savings Rate"
        value={`${savingsRate.toFixed(1)}%`}
        icon={Percent}
        color="violet"
        trend={savingsRate >= 20 ? 'up' : 'down'}
        trendValue={savingsRate >= 20 ? 'Healthy' : 'Needs work'}
        insight={savingsRate >= 20 ? 'On track for goals.' : 'Lift rate above 20% to stay resilient.'}
      />
    </div>
  );
};

export default SummaryCards;
