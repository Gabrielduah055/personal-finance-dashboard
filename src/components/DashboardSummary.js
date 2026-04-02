import { formatCurrency } from '../utils/helpers';

function DashboardSummary({ summary }) {
  const cards = [
    {
      label: 'Total Balance',
      value: summary.balance,
      tone: summary.balance >= 0 ? 'balance-positive' : 'balance-negative',
    },
    {
      label: 'Total Income',
      value: summary.income,
      tone: 'income-card',
    },
    {
      label: 'Total Expense',
      value: summary.expense,
      tone: 'expense-card',
    },
  ];

  return (
    <section className="summary-grid">
      {cards.map((card) => (
        <article key={card.label} className={`summary-card glass-card ${card.tone}`}>
          <p className="summary-label">{card.label}</p>
          <h2>{formatCurrency(card.value)}</h2>
        </article>
      ))}
    </section>
  );
}

export default DashboardSummary;
