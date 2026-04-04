import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import TransactionList from '../components/transactions/TransactionList';
import Modal from '../components/ui/Modal';
import TransactionForm from '../components/transactions/TransactionForm';
import Button from '../components/ui/Button';

const Transactions = () => {
  const { role, selectedTransaction, setSelectedTransaction } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedTransaction) setIsOpen(true);
  }, [selectedTransaction]);

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="space-y-5 lg:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Manage</p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Transactions</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Track, filter, and export your ledger in one place.</p>
        </div>
        {role === 'admin' && (
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Transaction
          </Button>
        )}
      </div>

      <TransactionList />

      {role === 'admin' && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg flex items-center justify-center"
          aria-label="Add transaction"
        >
          <Plus className="w-5 h-5" />
        </button>
      )}

      <Modal isOpen={isOpen} onClose={closeModal} title={selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}>
        <TransactionForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default Transactions;
