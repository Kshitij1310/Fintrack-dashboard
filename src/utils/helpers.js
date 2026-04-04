import {
  Wallet,
  UtensilsCrossed,
  Bus,
  ShoppingBag,
  Film,
  HeartPulse,
  ReceiptIndianRupee,
  Circle,
} from 'lucide-react';
import { CATEGORY_COLORS, CATEGORY_COLORS_HEX } from '../constants';

const getStoredCurrency = () => {
  if (typeof localStorage === 'undefined') return 'INR';
  return localStorage.getItem('currency') || 'INR';
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: getStoredCurrency(),
    minimumFractionDigits: 2,
  }).format(Number(amount) || 0);

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const exportToCSV = (transactions) => {
  const header = ['Date', 'Title', 'Amount', 'Category', 'Type', 'Note'];
  const rows = transactions.map((t) => [t.date, t.title, t.amount, t.category, t.type, t.note]);
  const csv = [header, ...rows]
    .map((row) =>
      row
        .map((val) => {
          const safe = `${val ?? ''}`.replace(/"/g, '""');
          return `"${safe}`.concat('"');
        })
        .join(',')
    )
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'fintrack-transactions.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getCategoryColor = (category) =>
  CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-100';

export const getCategoryIcon = (category) => {
  const map = {
    Food: UtensilsCrossed,
    Transport: Bus,
    Shopping: ShoppingBag,
    Entertainment: Film,
    Health: HeartPulse,
    Bills: ReceiptIndianRupee,
    Income: Wallet,
  };
  return map[category] || Circle;
};

const getLastSixMonths = () => {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: date.toLocaleDateString('en-US', { month: 'short' }),
    });
  }
  return months;
};

export const getMonthlyData = (transactions) => {
  const template = getLastSixMonths().map((m) => ({ month: m.label, income: 0, expense: 0, key: m.key }));
  const data = template.reduce((acc, curr) => ({ ...acc, [curr.key]: curr }), {});

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (data[key]) {
      if (t.type === 'Income') data[key].income += Number(t.amount);
      else data[key].expense += Number(t.amount);
    }
  });

  return Object.values(data);
};

export const getCategoryData = (transactions) => {
  const totals = {};

  transactions
    .filter((t) => t.type === 'Expense')
    .forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
    });

  return Object.entries(totals).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_COLORS_HEX[name] || '#e5e7eb',
  }));
};

export const getInsights = (transactions) => {
  if (!transactions.length) {
    return {
      highestCategory: 'No data',
      biggestExpense: 'No expenses logged yet',
      bestSavingMonth: 'N/A',
      tip: 'Start tracking transactions to unlock insights.',
    };
  }

  const expenses = transactions.filter((t) => t.type === 'Expense');
  const income = transactions.filter((t) => t.type === 'Income');

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
    return acc;
  }, {});

  const highestCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  const biggestExpense = expenses.sort((a, b) => b.amount - a.amount)[0];

  const monthly = getMonthlyData(transactions).map((m) => ({
    ...m,
    saving: (m.income || 0) - (m.expense || 0),
  }));
  const bestSavingMonth = monthly.sort((a, b) => b.saving - a.saving)[0];

  const expenseTotal = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const incomeTotal = income.reduce((sum, i) => sum + Number(i.amount), 0);
  const savingsRate = incomeTotal ? Math.max(0, ((incomeTotal - expenseTotal) / incomeTotal) * 100) : 0;

  const tip = savingsRate < 20
    ? 'Your savings rate is under 20%. Try capping discretionary spends or setting auto-savings.'
    : 'Great job! Consider channeling surplus into SIPs or an emergency fund.';

  return {
    highestCategory,
    biggestExpense: biggestExpense ? `${biggestExpense.title} - ${formatCurrency(biggestExpense.amount)}` : 'N/A',
    bestSavingMonth: bestSavingMonth ? `${bestSavingMonth.month} (${formatCurrency(bestSavingMonth.saving)})` : 'N/A',
    tip,
  };
};
