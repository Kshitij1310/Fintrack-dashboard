import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { useStore } from '../../store/useStore';
import { CATEGORIES, TRANSACTION_TYPES } from '../../constants';

const TransactionForm = ({ onClose }) => {
  const { addTransaction, updateTransaction, selectedTransaction, setSelectedTransaction } = useStore();
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'Expense',
    date: new Date().toISOString().slice(0, 10),
    note: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedTransaction) {
      setForm({ ...selectedTransaction, amount: selectedTransaction.amount });
    }
  }, [selectedTransaction]);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    if (!form.title.trim()) return 'Title is required';
    const amt = Number(form.amount);
    if (!Number.isFinite(amt) || amt <= 0) return 'Amount must be greater than 0';
    if (!form.category) return 'Category is required';
    if (!TRANSACTION_TYPES.includes(form.type)) return 'Invalid type';
    if (!form.date || Number.isNaN(new Date(form.date).getTime())) return 'Date is required';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    if (selectedTransaction) {
      updateTransaction(selectedTransaction.id, form);
    } else {
      addTransaction(form);
    }
    setError('');
    setSelectedTransaction(null);
    onClose();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && <div className="text-sm text-rose-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            placeholder="e.g. Uber Ride"
            required
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-1">Amount (₹)</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select category</option>
            {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-1">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Type</label>
        <div className="flex items-center gap-3">
          {TRANSACTION_TYPES.map((type) => (
            <label key={type} className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
              <input
                type="radio"
                name="type"
                value={type}
                checked={form.type === type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-1">Note</label>
        <textarea
          value={form.note}
          onChange={(e) => handleChange('note', e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
          placeholder="Optional details"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={() => { setSelectedTransaction(null); onClose(); }}>
          Cancel
        </Button>
        <Button type="submit">
          {selectedTransaction ? 'Update' : 'Add'} Transaction
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
