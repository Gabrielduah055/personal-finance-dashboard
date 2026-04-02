import { useEffect, useMemo, useState } from 'react';
import './App.css';
import DashboardSummary from './components/DashboardSummary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';
import {
  createTransactionId,
  getCategoryOptions,
  getDefaultFormState,
  getDefaultFilters,
  normalizeTransactionPayload,
  sortTransactionsByDate,
} from './utils/helpers';
import {
  loadTransactionsFromStorage,
  saveTransactionsToStorage,
} from './utils/localStorage';

function App() {
  const [transactions, setTransactions] = useState(() => loadTransactionsFromStorage());
  const [filters, setFilters] = useState(getDefaultFilters());
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [formState, setFormState] = useState(getDefaultFormState());
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    saveTransactionsToStorage(transactions);
  }, [transactions]);

  useEffect(() => {
    if (!statusMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setStatusMessage('');
    }, 2500);

    return () => window.clearTimeout(timeoutId);
  }, [statusMessage]);

  const categoryOptions = useMemo(
    () => getCategoryOptions(transactions),
    [transactions]
  );

  const filteredTransactions = useMemo(() => {
    const searchValue = filters.search.trim().toLowerCase();

    return sortTransactionsByDate(transactions).filter((transaction) => {
      const matchesSearch =
        !searchValue || transaction.title.toLowerCase().includes(searchValue);
      const matchesType =
        filters.type === 'all' || transaction.type === filters.type;
      const matchesCategory =
        filters.category === 'all' || transaction.category === filters.category;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, filters]);

  const summary = useMemo(() => {
    return transactions.reduce(
      (totals, transaction) => {
        const safeAmount = Number(transaction.amount) || 0;

        if (transaction.type === 'income') {
          totals.income += safeAmount;
        }

        if (transaction.type === 'expense') {
          totals.expense += safeAmount;
        }

        totals.balance = totals.income - totals.expense;
        return totals;
      },
      { balance: 0, income: 0, expense: 0 }
    );
  }, [transactions]);

  const handleSaveTransaction = (transactionInput) => {
    const normalizedTransaction = normalizeTransactionPayload(transactionInput);

    if (!normalizedTransaction) {
      return;
    }

    setTransactions((previousTransactions) => {
      if (editingTransactionId) {
        return previousTransactions.map((transaction) =>
          transaction.id === editingTransactionId
            ? { ...normalizedTransaction, id: editingTransactionId }
            : transaction
        );
      }

      return [
        { ...normalizedTransaction, id: createTransactionId() },
        ...previousTransactions,
      ];
    });

    setStatusMessage(editingTransactionId ? 'Transaction updated.' : 'Transaction added.');
    setEditingTransactionId(null);
    setFormState(getDefaultFormState());
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransactionId(transaction.id);
    setFormState({
      title: transaction.title,
      amount: String(transaction.amount),
      category: transaction.category,
      type: transaction.type,
      date: transaction.date,
    });
    setStatusMessage('Editing transaction.');
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactions((previousTransactions) => {
      const nextTransactions = previousTransactions.filter(
        (transaction) => transaction.id !== transactionId
      );

      return nextTransactions;
    });

    if (editingTransactionId === transactionId) {
      setEditingTransactionId(null);
      setFormState(getDefaultFormState());
    }

    setStatusMessage('Transaction deleted.');
  };

  const handleCancelEdit = () => {
    setEditingTransactionId(null);
    setFormState(getDefaultFormState());
    setStatusMessage('Edit cancelled.');
  };

  return (
    <div className="app-shell">
      <div className="background-glow background-glow-left" />
      <div className="background-glow background-glow-right" />

      <main className="dashboard-layout">
        <section className="hero-panel glass-card">
          <div>
            <p className="eyebrow">Personal Finance Dashboard</p>
            <h1>Track every cedi with clarity.</h1>
            <p className="hero-copy">
              Add income and expenses, review your balance instantly, and keep
              everything safe in localStorage.
            </p>
          </div>

          <div className="status-area" aria-live="polite">
            {statusMessage && <span className="status-pill">{statusMessage}</span>}
          </div>
        </section>

        <DashboardSummary summary={summary} />

        <section className="content-grid">
          <div className="glass-card form-panel">
            <TransactionForm
              key={editingTransactionId || 'new-transaction'}
              initialValues={formState}
              onSaveTransaction={handleSaveTransaction}
              onCancelEdit={handleCancelEdit}
              isEditing={Boolean(editingTransactionId)}
              categoryOptions={categoryOptions}
            />
          </div>

          <div className="glass-card list-panel">
            <FilterBar
              filters={filters}
              categoryOptions={categoryOptions}
              onFilterChange={setFilters}
            />

            {filteredTransactions.length === 0 ? (
              <EmptyState hasTransactions={transactions.length > 0} />
            ) : (
              <TransactionList
                transactions={filteredTransactions}
                onEditTransaction={handleEditTransaction}
                onDeleteTransaction={handleDeleteTransaction}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
