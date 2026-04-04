import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';

const defaultFilters = {
  search: '',
  category: 'All',
  type: 'All',
  dateFrom: '',
  dateTo: '',
  sortBy: 'date',
  sortOrder: 'desc',
};

const isBrowser = typeof localStorage !== 'undefined';

export const useStore = create(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      filters: defaultFilters,
      role: 'viewer',
      darkMode: isBrowser && localStorage.getItem('fintrack-dark') === 'true',
      selectedTransaction: null,

      addTransaction: (transaction) =>
        set((state) => {
          if (state.role !== 'admin') return {};
          return {
            transactions: [
              { ...transaction, id: crypto.randomUUID?.() || `t${Date.now()}` },
              ...state.transactions,
            ],
          };
        }),

      updateTransaction: (id, updated) =>
        set((state) => {
          if (state.role !== 'admin') return {};
          return {
            transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...updated } : t)),
          };
        }),

      deleteTransaction: (id) =>
        set((state) => {
          if (state.role !== 'admin') return {};
          return {
            transactions: state.transactions.filter((t) => t.id !== id),
          };
        }),

      setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),

      resetFilters: () => set({ filters: defaultFilters }),

      setRole: (role) => set({ role }),

      toggleDarkMode: () =>
        set((state) => {
          const next = !state.darkMode;
          if (isBrowser) {
            localStorage.setItem('fintrack-dark', next.toString());
            localStorage.setItem('theme', next ? 'dark' : 'light');
            const root = document.documentElement;
            root.classList.toggle('dark', next);
          }
          return { darkMode: next };
        }),

      setSelectedTransaction: (transaction) => set({ selectedTransaction: transaction }),

      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        const { search, category, type, dateFrom, dateTo, sortBy, sortOrder } = filters;

        let filtered = [...transactions];

        if (search) {
          const term = search.toLowerCase();
          filtered = filtered.filter(
            (t) => t.title.toLowerCase().includes(term) || t.note.toLowerCase().includes(term)
          );
        }

        if (category && category !== 'All') {
          filtered = filtered.filter((t) => t.category === category);
        }

        if (type && type !== 'All') {
          filtered = filtered.filter((t) => t.type === type);
        }

        if (dateFrom) {
          const from = new Date(dateFrom).getTime();
          filtered = filtered.filter((t) => new Date(t.date).getTime() >= from);
        }

        if (dateTo) {
          const to = new Date(dateTo).getTime();
          filtered = filtered.filter((t) => new Date(t.date).getTime() <= to);
        }

        filtered.sort((a, b) => {
          if (sortBy === 'amount') {
            return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
          }
          const da = new Date(a.date).getTime();
          const db = new Date(b.date).getTime();
          return sortOrder === 'asc' ? da - db : db - da;
        });

        return filtered;
      },
    }),
    {
      name: 'fintrack-store',
      partialize: (state) => ({
        filters: state.filters,
        role: state.role,
        darkMode: state.darkMode,
        transactions: state.transactions, // persist ledger locally
      }),
    }
  )
);
